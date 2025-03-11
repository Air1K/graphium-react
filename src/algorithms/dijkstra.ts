export const dijkstra = (graph: Map<string, Map<string, number>>, start: string, end: string): string[] => {
  const distances: Map<string, number> = new Map();
  const previous: Map<string, string | null> = new Map();
  const unvisited = new Set(graph.keys());

  graph.forEach((_, node) => {
    distances.set(node, node === start ? 0 : Infinity);
    previous.set(node, null);
  });

  while (unvisited.size) {
    let closestNode: string | null = null;
    unvisited.forEach((node) => {
      if (closestNode === null || (distances.get(node) ?? Infinity) < (distances.get(closestNode) ?? Infinity)) {
        closestNode = node;
      }
    });

    if (closestNode === end) {
      const path = [];
      let currentNode: string | null = end;
      while (currentNode) {
        path.unshift(currentNode);
        currentNode = previous.get(currentNode) || null;
      }
      return path;
    }

    if (closestNode === null) return [];
    unvisited.delete(closestNode);
    graph.get(closestNode)?.forEach((distance, neighbor) => {
      const newDist = (distances.get(closestNode!) ?? Infinity) + distance;
      if (newDist < (distances.get(neighbor) ?? Infinity)) {
        distances.set(neighbor, newDist);
        previous.set(neighbor, closestNode);
      }
    });
  }
  return [];
};
