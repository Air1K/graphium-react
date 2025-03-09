import React, { useRef, useState } from 'react';
import { getMousePosition } from '../utils/getMousePosition';
import { checkCollision } from '../utils/checkCollision';
import { IPosition, STATE } from '../types/index.type';
import { UsePointReturnType } from './usePoint';
import { RedrawCanvasFunction } from './useCanvasRenderer';
import { UseEdgeReturnType } from './useEdge';
import { calculateDistance } from '../utils/calculateDistance';
import { checkEdgeCollision } from '../utils/checkEdgeCollision';
import { weightEdge } from '../constants/constants';
import { UseCanvasStateReturnType } from './useCanvasState';

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  state: STATE;
  pointState: UsePointReturnType;
  edgeState: UseEdgeReturnType;
  redrawCanvas: RedrawCanvasFunction;
  activeEdge: string | null;
  setActiveEdge: React.Dispatch<React.SetStateAction<string | null>>;
  canvasState: UseCanvasStateReturnType;
}

export const useCanvasHandlers = ({
  canvasRef,
  state,
  pointState,
  redrawCanvas,
  edgeState,
  activeEdge,
  setActiveEdge,
  canvasState,
}: Props) => {
  const { points, addPoint, updatePoint, removePoint } = pointState;
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragPoint = useRef<IPosition | null>(null);
  const { edges, addEdge, hasEdge, setEdges, removeEdge, removeEdgesForPoint } = edgeState;
  const dragEdge = useRef<IPosition | null>(null);
  const { updateOffset, scale, offset: refOffset } = canvasState;
  const offset = refOffset.current.current;
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
      const mousePos = getMousePosition(event, canvasRef, scale, offset);
      const collisionIdPoint = checkCollision(mousePos, points);
      if (collisionIdPoint === null) {
        addPoint(mousePos);
      }
      return;
    }
    // Удаление
    if (event.altKey) {
      const mousePos = getMousePosition(event, canvasRef, scale, offset);
      const collisionIdPoint = checkCollision(mousePos, points);
      if (collisionIdPoint !== null) {
        removePoint(collisionIdPoint);
        removeEdgesForPoint(collisionIdPoint);
        return;
      }
      const edge = checkEdgeCollision(mousePos, edges, points, weightEdge);
      if (edge !== null) {
        removeEdge(edge.from, edge.to);
        return;
      }
      return;
    }
    if (activeEdge !== null) {
      const mousePos = getMousePosition(event, canvasRef, scale, offset);
      const collisionIdPoint = checkCollision(mousePos, points);
      if (collisionIdPoint === null || collisionIdPoint === activeEdge) {
        setActiveEdge(null);
        redrawCanvas();
        return;
      }
      const distance = calculateDistance({
        point1: points[activeEdge].position,
        point2: points[collisionIdPoint].position,
      });
      addEdge(activeEdge, collisionIdPoint, distance);
      setActiveEdge(null);
      return;
    }
  };
  const handleDoubleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('dblclick');
    const mousePos = getMousePosition(event, canvasRef, scale, offset);
    const collisionIdPoint = checkCollision(mousePos, points);
    if (collisionIdPoint !== null) {
      setActiveEdge(collisionIdPoint);
      dragEdge.current = mousePos;
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('move');
    // Обновляем временные координаты точки
    if (activePoint !== null && dragPoint.current) {
      dragPoint.current = getMousePosition(event, canvasRef, scale, offset);
      redrawCanvas(
        (point, id) => (activePoint === id && dragPoint.current ? dragPoint.current : point),
        hasEdge(activePoint)
          ? (point) => (activePoint === point.id && dragPoint.current ? dragPoint.current : point?.pointTo)
          : undefined
      );
      return;
    }
    // Обновляем временные координаты ребра
    if (activeEdge !== null && dragEdge.current) {
      dragEdge.current = getMousePosition(event, canvasRef, scale, offset);
      redrawCanvas(undefined, (point) =>
        activeEdge === point.id && dragEdge.current ? dragEdge.current : point?.pointTo
      );
      return;
    }
    if (isDragging) {
      updateOffset(event.clientX - dragStart.current.x, event.clientY - dragStart.current.y);
      dragStart.current = { x: event.clientX, y: event.clientY };
      redrawCanvas();
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('down');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mousePos = getMousePosition(event, canvasRef, scale, offset);
    const collisionIdPoint = checkCollision(mousePos, points);
    if (collisionIdPoint !== null) {
      setActivePoint(collisionIdPoint);
      dragPoint.current = { ...points[collisionIdPoint].position };
    }
    if (event.shiftKey) {
      setIsDragging(true);
      dragStart.current = { x: event.clientX, y: event.clientY };
    }
  };

  const handleMouseUp = () => {
    console.log('up');
    if (activePoint !== null && dragPoint.current !== null) {
      updatePoint(activePoint, dragPoint.current);
      if (hasEdge(activePoint)) {
        const point1 = dragPoint.current ?? { x: 0, y: 0 };
        setEdges((prevEdges) => {
          const newEdges = new Map(prevEdges);
          const connectedNodes = newEdges.get(activePoint);
          if (!connectedNodes) return newEdges;
          connectedNodes.forEach((_, to) => {
            const point2 = points[to].position;
            const newDistance = calculateDistance({ point1, point2 });
            newEdges.get(activePoint)!.set(to, newDistance);
            newEdges.get(to)?.set(activePoint, newDistance);
          });
          return newEdges;
        });
      }
      dragPoint.current = null;
      setActivePoint(null);
    }
    setIsDragging(false);
  };

  return { handleEvent };
};
