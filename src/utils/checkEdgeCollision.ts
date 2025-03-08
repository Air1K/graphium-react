import { isPointNearLine } from './isPointNearLine';
import { IEdge, IPoint } from '../types/index.type';

export const checkEdgeCollision = (mouse: IPoint, edges: IEdge, points: IPoint[], edgeWidth: number) => {
  for (const [from, connectedNodes] of edges.entries()) {
    for (const to of connectedNodes.keys()) {
      const p1 = points[from];
      const p2 = points[to];

      if (isPointNearLine(mouse, p1, p2, edgeWidth / 2)) {
        return { from, to };
      }
    }
  }
  return null;
};
