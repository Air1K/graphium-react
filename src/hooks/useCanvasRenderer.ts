import { IEdge, IPosition, PointsMap } from '../types/index.type';
import { colorEdge, colorEdgeText, colorNode, radiusNode, weightEdge } from '../constants/constants';
import { useEffect } from 'react';
import { calculateDistance } from '../utils/calculateDistance';
import { UseCanvasStateReturnType } from './useCanvasState';
import { drawGrid } from '../utils/canvas/drawGrid';

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvasState: UseCanvasStateReturnType;
  points: PointsMap;
  edges: IEdge;
  activeEdge: string | null;
}

export interface RedrawCanvasFunction {
  (
    redrawPoint?: (point: IPosition, id: string) => IPosition,
    redrawEdge?: ({ pointTo, id }: { pointTo?: IPosition; id: string }) => IPosition | undefined
  ): void;
}

export const useCanvasRenderer = ({ canvasRef, points, edges, activeEdge, canvasState }: Props) => {
  const { scale, gridSize, showGrid, offset } = canvasState;

  const redrawCanvas: RedrawCanvasFunction = (redrawPoint, redrawEdge) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2 + offset.current.current.x, canvas.height / 2 + offset.current.current.y);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    const transform = ctx.getTransform();
    // console.log(transform);
    console.log(transform.e, transform.f);
    drawGrid(ctx, canvas.width, canvas.height, gridSize, scale, showGrid);
    edges.forEach((connectedNodes, from) => {
      const positionFrom = points[from];
      if (!positionFrom) return;

      connectedNodes.forEach((distance, to) => {
        const positionTo = points[to];
        if (!positionTo) return;

        const p1 =
          redrawEdge && !activeEdge
            ? (redrawEdge({ pointTo: positionFrom.position, id: from }) ?? positionFrom.position)
            : positionFrom.position;
        const p2 =
          redrawEdge && !activeEdge
            ? (redrawEdge({ pointTo: positionTo.position, id: to }) ?? positionTo.position)
            : positionTo.position;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = colorEdge;
        ctx.lineWidth = weightEdge;
        ctx.stroke();
        const newDistance = calculateDistance({ point1: p1, point2: p2 });
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        ctx.font = '14px Arial';
        ctx.fillStyle = colorEdgeText;
        ctx.fillText(newDistance.toFixed(1), midX, midY);
      });
    });
    if (activeEdge !== null) {
      const newPos = redrawEdge?.({ id: activeEdge });
      if (newPos) {
        const p1 = points[activeEdge].position;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(newPos.x, newPos.y);
        ctx.setLineDash([10, 5]);
        ctx.strokeStyle = colorEdge;
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // Отрисовка точек
    Object.entries(points).forEach(([id, point], index) => {
      const p = redrawPoint ? redrawPoint(point.position, id) : point.position;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radiusNode, 0, Math.PI * 2);
      ctx.fillStyle = colorNode;
      ctx.fill();
      ctx.closePath();
      ctx.font = '14px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(index.toString(), p.x, p.y);
    });
    ctx.restore();
  };

  useEffect(() => {
    console.log('offset', offset);
  }, [offset]);

  useEffect(() => {
    redrawCanvas();
  }, [points, edges, scale, gridSize, showGrid]);

  return { redrawCanvas };
};
