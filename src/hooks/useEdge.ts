import { useEffect, useState } from 'react';
import { IEdge } from '../types/index.type';

const useEdge = () => {
  const [edges, setEdges] = useState<IEdge>(new Map());

  useEffect(() => {
    console.log('edges', edges);
  }, [edges]);

  // Добавить связь с расстоянием
  const addEdge = (from: string, to: string, distance: number) => {
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
  const removeEdge = (from: string, to: string) => {
    setEdges((prevEdges) => {
      const newEdges = new Map(prevEdges);
      newEdges.get(from)?.delete(to);
      newEdges.get(to)?.delete(from);
      return newEdges;
    });
  };

  // Удалить все связи с точкой
  const removeEdgesForPoint = (idPoint: string) => {
    setEdges((prevEdges) => {
      console.log('prevEdges', prevEdges);
      const newEdges = new Map(prevEdges);
      const connectedNodes = newEdges.get(idPoint);
      if (connectedNodes) {
        connectedNodes.forEach((_, to) => {
          console.log('В to = ', to, ' удалена связь с ', idPoint);
          newEdges.get(to)?.delete(idPoint);
        });
        console.log('В point = ', idPoint, ' удалены все связи');
        newEdges.delete(idPoint);
      }
      console.log('newEdges', newEdges);
      return newEdges;
    });
  };

  // Проверить, есть ли связь
  const hasEdge = (from: string, to?: string) => {
    if (to === undefined) {
      return !!edges.get(from)?.size || false;
    }
    return edges.get(from)?.has(to) || false;
  };

  // Получить расстояние между точками
  const getDistance = (from: string, to: string) => {
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
