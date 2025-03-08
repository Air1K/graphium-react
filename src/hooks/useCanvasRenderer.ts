import { IEdge, IPoint } from '../types/index.type';
import { colorEdge, colorEdgeText, colorNode, radiusNode, weightEdge } from '../constants/constants';
import { useEffect } from 'react';
import { calculateDistance } from '../utils/calculateDistance';

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  points: IPoint[];
  edges: IEdge;
  activeEdge: number | null;
}

export interface RedrawCanvasFunction {
  (
    redrawPoint?: (point: IPoint, index: number) => IPoint,
    redrawEdge?: ({ pointTo, index }: { pointTo?: IPoint; index: number }) => IPoint | undefined
  ): void;
}

export const useCanvasRenderer = ({ canvasRef, points, edges, activeEdge }: Props) => {
  const redrawCanvas: RedrawCanvasFunction = (redrawPoint, redrawEdge) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // console.clear();
    edges.forEach((connectedNodes, from) => {
      // console.log('forEach edges', connectedNodes?.size, Boolean(connectedNodes?.size));
      connectedNodes.forEach((distance, to) => {
        const positionFrom = activeEdge !== null ? points[from] : redrawEdge?.({ pointTo: points[from], index: from });
        const positionTo = activeEdge !== null ? points[to] : redrawEdge?.({ pointTo: points[to], index: to });

        // console.log(positionFrom);
        const { x: x1, y: y1 } = positionFrom ?? points[from];
        const { x: x2, y: y2 } = positionTo ?? points[to];
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = colorEdge;
        ctx.lineWidth = weightEdge;
        ctx.stroke();

        // Вывод расстояния на середине линии
        const newDistance =
          positionFrom && positionTo ? calculateDistance({ point1: positionFrom, point2: positionTo }) : distance;
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        ctx.font = '14px Arial';
        ctx.fillStyle = colorEdgeText;
        ctx.fillText(newDistance.toFixed(1), midX, midY);
      });
    });
    if (activeEdge !== null) {
      const newPos = redrawEdge?.({ index: activeEdge });
      if (newPos) {
        const { x: x1, y: y1 } = points[activeEdge];
        const { x: x2, y: y2 } = newPos;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = colorEdge;
        ctx.lineWidth = 4;
        ctx.stroke();
      }
    }

    points.forEach((point, index) => {
      const { x, y } = redrawPoint?.(point, index) ?? point;
      ctx.beginPath();
      ctx.arc(x, y, radiusNode, 0, Math.PI * 2); // Радиус круга 12px (24px диаметр)
      ctx.fillStyle = colorNode;
      ctx.fill();
      ctx.closePath();
    });
  };

  // Отрисовка точек
  useEffect(() => {
    redrawCanvas();
  }, [points, edges]);

  return { redrawCanvas };
};
