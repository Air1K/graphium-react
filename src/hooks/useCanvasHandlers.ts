import React, { useRef, useState } from 'react';
import { getMousePosition } from '../utils/getMousePosition';
import { checkCollision } from '../utils/checkCollision';
import { IPoint, STATE } from '../types/index.type';
import { UsePointReturnType } from './usePoint';
import { RedrawCanvasFunction } from './useCanvasRenderer';
import { UseEdgeReturnType } from './useEdge';
import { calculateDistance } from '../utils/calculateDistance';
import { checkEdgeCollision } from '../utils/checkEdgeCollision';

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  state: STATE;
  pointState: UsePointReturnType;
  edgeState: UseEdgeReturnType;
  redrawCanvas: RedrawCanvasFunction;
  activeEdge: number | null;
  setActiveEdge: React.Dispatch<React.SetStateAction<number | null>>;
}

export const useCanvasHandlers = ({
  canvasRef,
  state,
  pointState,
  redrawCanvas,
  edgeState,
  activeEdge,
  setActiveEdge,
}: Props) => {
  const { points, addPoint, updatePoint, removePoint } = pointState;
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const dragPoint = useRef<IPoint | null>(null);
  const { edges, addEdge, hasEdge, setEdges, removeEdge, removeEdgesForPoint } = edgeState;
  const dragEdge = useRef<IPoint | null>(null);

  const handleEvent = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (state === STATE.DISABLE) return;

    const handlers: Record<string, (event: React.MouseEvent<HTMLCanvasElement>) => void> = {
      click: handleCanvasClick,
      mousemove: handleMouseMove,
      mousedown: handleMouseDown,
      mouseup: handleMouseUp,
      dblclick: handleDoubleClick,
    };
    const handler = handlers[event.type];
    if (handler) handler(event);
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('click');
    if (event.ctrlKey) {
      const mousePos = getMousePosition(event, canvasRef);
      const collisionIndex = checkCollision(mousePos, points);
      if (collisionIndex === null) {
        addPoint(mousePos);
      }
      return;
    }
    // Удаление
    if (event.altKey) {
      const mousePos = getMousePosition(event, canvasRef);
      const pointCollisionIndex = checkCollision(mousePos, points);
      if (pointCollisionIndex !== null) {
        removePoint(pointCollisionIndex);
        removeEdgesForPoint(pointCollisionIndex);
        return;
      }
      const edge = checkEdgeCollision(mousePos, edges, points, 8);
      if (edge !== null) {
        removeEdge(edge.from, edge.to);
        return;
      }
    }
    if (activeEdge !== null) {
      const mousePos = getMousePosition(event, canvasRef);
      const collisionIndex = checkCollision(mousePos, points);
      if (collisionIndex === null) {
        setActiveEdge(null);
        redrawCanvas();
        return;
      }
      const distance = calculateDistance({
        point1: points[activeEdge],
        point2: points[collisionIndex],
      });
      addEdge(activeEdge, collisionIndex, distance);
      setActiveEdge(null);
      return;
    }
  };
  const handleDoubleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('dblclick');
    const mousePos = getMousePosition(event, canvasRef);
    const collisionIndex = checkCollision(mousePos, points);
    if (collisionIndex !== null) {
      setActiveEdge(collisionIndex);
      dragEdge.current = mousePos;
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('move');
    // Обновляем временные координаты точки
    if (activePoint !== null && dragPoint.current) {
      dragPoint.current = getMousePosition(event, canvasRef);
      redrawCanvas(
        (point, index) => (activePoint === index && dragPoint.current ? dragPoint.current : point),
        hasEdge(activePoint)
          ? (point) => (activePoint === point.index && dragPoint.current ? dragPoint.current : point?.pointTo)
          : undefined
      );
      return;
    }

    // Обновляем временные координаты ребра
    if (activeEdge !== null && dragEdge.current) {
      dragEdge.current = getMousePosition(event, canvasRef);
      redrawCanvas(undefined, (point) =>
        activeEdge === point.index && dragEdge.current ? dragEdge.current : point?.pointTo
      );
      return;
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('down');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mousePos = getMousePosition(event, canvasRef);
    const collisionIndex = checkCollision(mousePos, points);
    if (collisionIndex !== null) {
      setActivePoint(collisionIndex);
      dragPoint.current = { ...points[collisionIndex] };
    }
  };

  const handleMouseUp = () => {
    console.log('up');
    if (activePoint === null || dragPoint.current === null) return;
    updatePoint(activePoint, dragPoint.current);
    if (hasEdge(activePoint)) {
      const point1 = dragPoint.current ?? { x: 0, y: 0 };
      setEdges((prevEdges) => {
        const newEdges = new Map(prevEdges);
        const connectedNodes = newEdges.get(activePoint);
        if (!connectedNodes) return newEdges;
        connectedNodes.forEach((_, to) => {
          const point2 = points[to];
          const newDistance = calculateDistance({ point1, point2 });
          newEdges.get(activePoint)!.set(to, newDistance);
          newEdges.get(to)?.set(activePoint, newDistance);
        });
        return newEdges;
      });
    }
    dragPoint.current = null;
    setActivePoint(null);
  };

  return { handleEvent };
};
