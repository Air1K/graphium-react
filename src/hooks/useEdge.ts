import { useEffect, useState } from 'react';
import { IEdge } from '../types/index.type';

const useEdge = () => {
  const [edges, setEdges] = useState<IEdge>(new Map());

  useEffect(() => {
    console.log('edges', edges);
  }, [edges]);

  // Добавить связь с расстоянием
  const addEdge = (from: number, to: number, distance: number) => {
    setEdges((prevEdges) => {
      const newEdges = new Map(prevEdges);
      if (!newEdges.has(from)) newEdges.set(from, new Map());
      if (!newEdges.has(to)) newEdges.set(to, new Map());
      newEdges.get(from)!.set(to, distance);
      newEdges.get(to)!.set(from, distance); // Двустороннее соединение
      return newEdges;
    });
  };

  // Удалить связь
  const removeEdge = (from: number, to: number) => {
    setEdges((prevEdges) => {
      const newEdges = new Map(prevEdges);
      newEdges.get(from)?.delete(to);
      newEdges.get(to)?.delete(from);
      return newEdges;
    });
  };

  // Удалить все связи с точкой
  const removeEdgesForPoint = (point: number) => {
    setEdges((prevEdges) => {
      const newEdges = new Map(prevEdges);
      const connectedNodes = newEdges.get(point);
      if (connectedNodes) {
        connectedNodes.forEach((_, to) => {
          newEdges.get(to)?.delete(point);
        });
        newEdges.delete(point);
      }
      return newEdges;
    });
  };

  // Проверить, есть ли связь
  const hasEdge = (from: number, to?: number) => {
    if (to === undefined) {
      return !!edges.get(from)?.size || false;
    }
    return edges.get(from)?.has(to) || false;
  };

  // Получить расстояние между точками
  const getDistance = (from: number, to: number) => {
    return edges.get(from)?.get(to) ?? null;
  };

  // Очистить все связи
  const clearEdges = () => setEdges(new Map());

  return {
    edges,
    setEdges,
    addEdge,
    removeEdge,
    removeEdgesForPoint,
    hasEdge,
    getDistance,
    clearEdges,
  };
};

export default useEdge;

export type UseEdgeReturnType = ReturnType<typeof useEdge>;
