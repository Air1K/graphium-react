import React, { useRef, useState } from 'react';
import { getMousePosition } from '../utils/getMousePosition';
import { checkCollision } from '../utils/checkCollision';
import { IPoint, STATE } from '../types/index.type';
import { UsePointReturnType } from './usePoint';
import { RedrawCanvasFunction } from './useCanvasRenderer';
import { UseEdgeReturnType } from './useEdge';
import { calculateDistance } from '../utils/calculateDistance';

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  state: STATE;
  pointState: UsePointReturnType;
  edgeState: UseEdgeReturnType;
  redrawCanvas: RedrawCanvasFunction;
}

export const useCanvasHandlers = ({ canvasRef, state, pointState, redrawCanvas, edgeState }: Props) => {
  const { points, addPoint, updatePoint } = pointState;
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const dragPoint = useRef<IPoint | null>(null);
  const { edges, addEdge } = edgeState;
  const [activeEdge, setActiveEdge] = useState<number | null>(null);
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
      addPoint(mousePos);
      return;
    }
    if (activeEdge !== null) {
      const mousePos = getMousePosition(event, canvasRef);
      const collisionIndex = checkCollision(mousePos, points);
      if (collisionIndex === null) {
        setActiveEdge(null);
        return;
      }
      const distance = calculateDistance({
        point1: points[activeEdge],
        point2: points[collisionIndex],
      });
      addEdge(activeEdge, collisionIndex, distance);
      setActiveEdge(null);
    }
  };
  const handleDoubleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('dblclick');
    const mousePos = getMousePosition(event, canvasRef);
    const collisionIndex = checkCollision(mousePos, points);
    if (collisionIndex !== null) {
      setActiveEdge(collisionIndex);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('move');
    // Обновляем временные координаты точки
    if (activePoint !== null && dragPoint.current) {
      dragPoint.current = getMousePosition(event, canvasRef);
      redrawCanvas((point, index) => (activePoint === index && dragPoint.current ? dragPoint.current : point));
      return;
    }

    // Обновляем временные координаты ребра
    if (activeEdge !== null && dragEdge.current) {
      dragEdge.current = getMousePosition(event, canvasRef);
      redrawCanvas((point, index) => (activeEdge === index && dragEdge.current ? dragEdge.current : point));
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

    if (activePoint === null || dragPoint.current === null) {
      setActivePoint(null);
      return;
    }
    updatePoint(activePoint, dragPoint.current);
    dragPoint.current = null;
    setActivePoint(null);
  };

  return { handleEvent };
};
