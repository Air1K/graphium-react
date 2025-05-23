import { IEdge } from '../../types/index.type';

export const serializeEdges = (edges: IEdge): Record<string, Record<string, number>> => {
  const result: Record<string, Record<string, number>> = {};
  edges.forEach((innerMap, from) => {
    result[from] = {};
    innerMap.forEach((weight, to) => {
      result[from][to] = weight;
    });
  });
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deserializeEdges = (obj: any): IEdge => {
  const edges: IEdge = new Map();
  Object.entries(obj).forEach(([from, inner]) => {
    const map = new Map<string, number>();
    if (typeof inner === 'object' && inner !== null) {
      Object.entries(inner as Record<string, number>).forEach(([to, weight]) => {
        map.set(to, Number(weight));
      });
    }
    edges.set(from, map);
  });
  return edges;
};