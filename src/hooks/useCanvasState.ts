import { useEffect, useRef, useState } from 'react';

export const useCanvasState = () => {
  const [scale, setScale] = useState(1); //Масштаб
  const [hoveredEdge, setHoveredEdge] = useState<{ from: number; to: number } | null>(null);
  const offset = useRef({ x: 0, y: 0 }); // Смещение
  const [showGrid, setShowGrid] = useState(true); // Показывать сетку
  const [gridSize, setGridSize] = useState(50); // Размер ячеек сетки
  const [gridFixed, setGridFixed] = useState(false);
  // Изменение масштаба
  const updateScaleUp = () => {
    setScale((prevScale) => Math.min(5, prevScale + 0.2));
  };

  const updateScaleDown = () => {
    setScale((prevScale) => Math.max(0.2, prevScale - 0.2));
  };

  const updateGridSizeUp = () => {
    setGridSize((prevSize) => Math.min(100, prevSize + 5));
  };

  const updateGridSizeDown = () => {
    setGridSize((prevSize) => Math.max(10, prevSize - 5));
  };

  // Включение/выключение сетки
  const toggleGrid = () => {
    setShowGrid((prev) => !prev);
  };

  // Включение/выключение фиксированной сетки
  const toggleGridFixed = () => {
    setGridFixed((prev) => !prev);
  };

  const updateOffset = (dx: number, dy: number) => {
    offset.current = { x: offset.current.x + dx, y: offset.current.y + dy };
  };

  useEffect(() => {
    console.log(offset);
  }, [offset]);

  return {
    scale,
    updateScaleUp,
    updateScaleDown,
    hoveredEdge,
    setHoveredEdge,
    showGrid,
    toggleGrid,
    gridSize,
    setGridSize,
    updateGridSizeUp,
    updateGridSizeDown,
    offset,
    updateOffset,
    toggleGridFixed,
    gridFixed,
  };
};

export type UseCanvasStateReturnType = ReturnType<typeof useCanvasState>;
