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

  useEffect(() => {
    console.log(optimalPath);
  }, [optimalPath]);

  const addSelectedPoint = (point: string) => {
    if (selectedPoints.start === null) {
      setSelectedPoints({ start: point, end: null });
      return;
    }
    if (selectedPoints.end === null) {
      setSelectedPoints({ start: selectedPoints.start, end: point });
      return;
    }
    if (point === selectedPoints.start) {
      setSelectedPoints({ start: null, end: selectedPoints.end });
      return;
    }
    if (point === selectedPoints.end) {
      setSelectedPoints({ start: selectedPoints.start, end: null });
    }
    setSelectedPoints({ start: selectedPoints.start, end: point });
  };

  return { selectedPoints, setSelectedPoints, selectedAlgorithm, setSelectedAlgorithm, optimalPath, addSelectedPoint };
};

export type UsePathFindingReturnType = ReturnType<typeof usePathFinding>;
