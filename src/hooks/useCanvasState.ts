import { useState } from 'react';

export const useCanvasState = () => {
  const [scale, setScale] = useState(1); //Масштаб
  const [hoveredEdge, setHoveredEdge] = useState<{ from: number; to: number } | null>(null);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  // Оптимальный путь

  const [showGrid, setShowGrid] = useState(true); // Показывать сетку
  const [gridSize, setGridSize] = useState(50); // Размер ячеек сетки

  // Изменение масштаба
  const updateScale = (newScale: number) => {
    setScale(Math.max(0.5, Math.min(3, newScale)));
  };

  // Включение/выключение сетки
  const toggleGrid = () => {
    setShowGrid((prev) => !prev);
  };

  return {
    scale,
    updateScale,
    hoveredEdge,
    setHoveredEdge,
    selectedNode,
    setSelectedNode,
    showGrid,
    toggleGrid,
    gridSize,
    setGridSize,
  };
};
