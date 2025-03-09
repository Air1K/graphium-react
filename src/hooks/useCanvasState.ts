import { useEffect, useRef, useState } from 'react';

export const useCanvasState = () => {
  const [scale, setScale] = useState(1); //Масштаб
  const [hoveredEdge, setHoveredEdge] = useState<{ from: number; to: number } | null>(null);
  const offset = useRef({
    current: { x: 0, y: 0 },
    prev: { x: 0, y: 0 },
  }); // Смещение
  const [showGrid, setShowGrid] = useState(true); // Показывать сетку
  const [gridSize, setGridSize] = useState(50); // Размер ячеек сетки
  const prevScale = useRef(scale);
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

  const updateOffset = (dx: number, dy: number) => {
    offset.current.current = { x: offset.current.current.x + dx, y: offset.current.current.y + dy };
  };

  useEffect(() => {
    const scaleFactor = scale / prevScale.current;
    // const canvas = canvasRef.current;
    // if (!canvas) return;

    const centerX = 900 / 2;
    const centerY = 600 / 2;

    offset.current = {
      prev: {
        x: centerX * 0.8,
        y: centerY * 0.8,
      },
      current: {
        x: offset.current.current.x,
        y: offset.current.current.y,
      },
    };

    prevScale.current = scale;
    console.log('useEffect', offset.current, scaleFactor);
  }, [scale]);

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
  };
};

export type UseCanvasStateReturnType = ReturnType<typeof useCanvasState>;
