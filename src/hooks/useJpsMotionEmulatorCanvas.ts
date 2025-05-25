import { useRef, useEffect } from 'react';
import { IEdge, IPosition, OptimalPath, PointsMap } from '../types/index.type';
import { isEmpty } from '../utils/checkEmpty';
import { UseCanvasStateReturnType } from './useCanvasState';

export interface UseJpsMotionEmulatorCanvasProps {
  optimalPath?: OptimalPath[];
  points?: PointsMap;
  edges?: IEdge;
  canvasState: UseCanvasStateReturnType;
}

function getJpsPath(optimalPaths: OptimalPath[], points: PointsMap, edges: IEdge): Record<string, IPosition[]> {
  const SPEED_M_S = 50000 / 3600; // 5 км/ч в м/с 50км/ч моково, для ускорения визуализации

  const result: Record<string, IPosition[]> = {};

  for (const { id, path } of optimalPaths) {
    const coords: IPosition[] = [];
    if (path.length === 0) {
      result[id] = coords;
      continue;
    }
    const startPos = points[path[0]].position;
    coords.push({ x: startPos.x, y: startPos.y });

    for (let i = 0; i < path.length - 1; i++) {
      const from = path[i];
      const to = path[i + 1];
      const p1 = points[from].position;
      const p2 = points[to].position;

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
  optimalPath: optimalPaths,
  edges,
  points,
  canvasState,
}: UseJpsMotionEmulatorCanvasProps) => {
  const { scale, offset } = canvasState;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pathsRef = useRef<Record<string, IPosition[]>>({});
  const indexRef = useRef<Record<string, number>>({});
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawFrame = () => {
      ctx.save();
      ctx.resetTransform();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // apply pan & zoom
      ctx.translate(canvas.width / 2 + offset.current.x, canvas.height / 2 + offset.current.y);
      ctx.scale(scale.value, scale.value);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      Object.entries(pathsRef.current).forEach(([id, coords]) => {
        const idx = indexRef.current[id] ?? 0;
        const { x, y } = coords[Math.min(idx, coords.length - 1)];
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
      });

      ctx.restore();
    };

    const startAnim = () => {
      if (animRef.current !== null) clearInterval(animRef.current);
      animRef.current = window.setInterval(() => {
        Object.keys(pathsRef.current).forEach((id) => {
          const coords = pathsRef.current[id];
          const curr = indexRef.current[id] || 0;
          if (curr < coords.length - 1) {
            indexRef.current[id] = curr + 1;
          } else {
            delete pathsRef.current[id];
            delete indexRef.current[id];
          }
        });
        drawFrame();
        if (Object.keys(pathsRef.current).length === 0 && animRef.current) {
          clearInterval(animRef.current);
        }
      }, 1000);
    };

    const init = () => {
      if (!optimalPaths?.length || !points || !(edges instanceof Map) || edges.size === 0) return;
      pathsRef.current = getJpsPath(optimalPaths, points, edges);
      indexRef.current = Object.keys(pathsRef.current).reduce(
        (acc, id) => {
          acc[id] = 0;
          return acc;
        },
        {} as Record<string, number>
      );
      drawFrame();
      startAnim();
    };

    init();
    return () => {
      if (animRef.current !== null) clearInterval(animRef.current);
    };
  }, [optimalPaths, points, edges, scale.value, offset.current.x, offset.current.y]);

  return { canvasRef };
};
