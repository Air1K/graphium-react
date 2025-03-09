import { isPointNearLine } from './isPointNearLine';
import { IEdge, IPosition, PointsMap } from '../types/index.type';

export const checkEdgeCollision = (mouse: IPosition, edges: IEdge, points: PointsMap, edgeWidth: number) => {
  for (const [from, connectedNodes] of edges.entries()) {
    const p1 = points[from];
    if (!p1) continue;

    for (const to of connectedNodes.keys()) {
      const p2 = points[to];
      if (!p2) continue;

      if (isPointNearLine(mouse, p1.position, p2.position, edgeWidth / 2)) {
        return { from, to };
      }
    }
  }
  return null;
};
