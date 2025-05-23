import { useRef, useEffect } from 'react';
import { IEdge, IPosition, OptimalPath, PointsMap } from '../types/index.type';

export interface UseJpsMotionEmulatorCanvasProps {
  imageSrc?: string;
  optimalPath?: OptimalPath[];
  points?: PointsMap;
  edges?: IEdge;
}

function getJpsPath(optimalPaths: OptimalPath[], points: PointsMap, edges: IEdge): Record<string, IPosition[]> {
  const SPEED_M_S = 50000 / 3600; // 5 км/ч в м/с

  const result: Record<string, IPosition[]> = {};

  for (const { id, path } of optimalPaths) {
    const coords: IPosition[] = [];
    if (path.length === 0) {
      result[id] = coords;
      continue;
    }

    // стартовая точка
    const startPos = points[path[0]].position;
    coords.push({ x: startPos.x, y: startPos.y });

    // для каждого сегмента между узлами
    for (let i = 0; i < path.length - 1; i++) {
      const from = path[i];
      const to = path[i + 1];

      const p1 = points[from].position;
      const p2 = points[to].position;

      // дистанция в метрах по карте рёбер
      const edgeMap = edges.get(from);
      const dist = edgeMap && edgeMap.has(to) ? edgeMap.get(to)! : Math.hypot(p2.x - p1.x, p2.y - p1.y); // fallback: эвклидово

      const segmentTime = Math.max(1, Math.ceil(dist / SPEED_M_S)); // сек

      // добавляем по одной точке на каждый «секундный» шаг
      for (let s = 1; s <= segmentTime; s++) {
        const t = s / segmentTime;
        coords.push({
          x: p1.x + (p2.x - p1.x) * t,
          y: p1.y + (p2.y - p1.y) * t,
        });
      }
    }

    result[id] = coords;
  }

  return result;
}

export const useJpsMotionEmulatorCanvas = ({
  imageSrc,
  optimalPath: optimalPaths,
  edges,
  points,
}: UseJpsMotionEmulatorCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pathsRef = useRef<Record<string, IPosition[]>>({});
  const indexRef = useRef<Record<string, number>>({});
  const imgRef = useRef<HTMLImageElement>(new Image());
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (imgRef.current.complete) {
        ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
      }
      for (const [id, coords] of Object.entries(pathsRef.current)) {
        const idx = indexRef.current[id]!;
        const pos = coords[Math.min(idx, coords.length - 1)];
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
      }
    };

    const startAnim = () => {
      if (animRef.current !== null) {
        clearInterval(animRef.current);
      }
      animRef.current = window.setInterval(() => {
        for (const id of Object.keys(pathsRef.current)) {
          const coords = pathsRef.current[id];
          const curr = indexRef.current[id]!;
          if (curr < coords.length - 1) {
            indexRef.current[id] = curr + 1;
          } else {
            delete pathsRef.current[id];
            delete indexRef.current[id];
          }
        }
        drawFrame();
        if (Object.keys(pathsRef.current).length === 0 && animRef.current) {
          clearInterval(animRef.current);
        }
      }, 1000);
    };

    const initPathsAndStart = () => {
      if (!optimalPaths || !points || !edges) return;
      pathsRef.current = getJpsPath(optimalPaths, points, edges);
      indexRef.current = Object.keys(pathsRef.current).reduce(
        (acc, id) => ({ ...acc, [id]: 0 }),
        {} as Record<string, number>
      );
      drawFrame();
      startAnim();
    };

    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        imgRef.current = img;
        initPathsAndStart();
      };
      img.onerror = initPathsAndStart;
    } else {
      initPathsAndStart();
    }

    return () => {
      if (animRef.current !== null) {
        clearInterval(animRef.current);
      }
    };
  }, [optimalPaths, points, imageSrc, edges]);

  return { canvasRef };
};
