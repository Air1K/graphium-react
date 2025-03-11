import { useEffect, useState } from 'react';
import { dijkstra } from '../algorithms/dijkstra';
import { IEdge } from '../types/index.type';

export type AlgorithmType = 'dijkstra' | 'custom';

const algorithms: Record<Exclude<AlgorithmType, 'custom'>, (graph: IEdge, start: string, end: string) => string[]> = {
  dijkstra: dijkstra,
};

interface Props {
  edges: IEdge;
  customAlgorithm?: (graph: IEdge, start: string, end: string) => string[];
}

export const usePathFinding = ({ edges, customAlgorithm }: Props) => {
  const [selectedPoints, setSelectedPoints] = useState<{ start: string | null; end: string | null }>({
    start: null,
    end: null,
  });
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('dijkstra');
  const [optimalPath, setOptimalPath] = useState<string[]>([]);

  useEffect(() => {
    const { start, end } = selectedPoints;
    if (!start || !end) return;

    const algorithm =
      selectedAlgorithm === 'custom' && customAlgorithm
        ? customAlgorithm
        : (algorithms[selectedAlgorithm as keyof typeof algorithms] ?? dijkstra);

    setOptimalPath(algorithm(edges, start, end));
  }, [selectedAlgorithm, edges, selectedPoints, customAlgorithm]);

  return { selectedPoints, setSelectedPoints, selectedAlgorithm, setSelectedAlgorithm, optimalPath };
};

export type UsePathFindingReturnType = ReturnType<typeof usePathFinding>;
