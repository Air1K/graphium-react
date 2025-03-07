import { IEdge, IPoint } from '../types/index.type';
import { radiusNode } from '../constants/constants';
import { useEffect } from 'react';

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  points: IPoint[];
  edges: IEdge;
}

export interface RedrawCanvasFunction {
  (
    redrawPoint?: (mouse: IPoint, index: number) => IPoint,
    redrawEdge?: (mouse: IPoint, index: number) => number
  ): void;
}

export const useCanvasRenderer = ({ canvasRef, points, edges }: Props) => {
  const redrawCanvas: RedrawCanvasFunction = (redrawPoint, redrawEdge) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    points.forEach((point, index) => {
      const { x, y } = redrawPoint?.(point, index) ?? point;
      ctx.beginPath();
      ctx.arc(x, y, radiusNode, 0, Math.PI * 2); // Радиус круга 12px (24px диаметр)
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();
    });

    edges.forEach((connectedNodes, from) => {
      connectedNodes.forEach((distance, to) => {
        const { x: x1, y: y1 } = points[from];
        const { x: x2, y: y2 } = points[to];

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 🔹 2. Вывод расстояния на середине линии
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        ctx.font = '14px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(distance.toFixed(1), midX, midY);
      });
    });
  };

  // Отрисовка точек
  useEffect(() => {
    redrawCanvas();
  }, [points, edges]);

  return { redrawCanvas };
};
