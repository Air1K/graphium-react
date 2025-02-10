import React, { useRef, useState, useEffect } from 'react';
import useContextMenu from '../../hooks/useContextMenu';
import ContextMenu from '../ContextMenu/ContextMeny';
import styles from './Area.module.scss';
export interface AreaProps {
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

interface Point {
  x: number;
  y: number;
}

const Area = ({ width = 800, height = 600 }: AreaProps): React.ReactElement => {
  const { menuVisible, menuPosition, handleContextMenu, handleCloseMenu } = useContextMenu();
  const menuItems = [
    { label: 'Action 1', action: 'Action 1' },
    { label: 'Action 2', action: 'Action 2' },
    { label: 'Action 3', action: 'Action 3' },
  ];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const radiusNode = 12;
  // Обработчик кликов на canvas
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (event.ctrlKey) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Добавляем новую точку
        setPoints((prevPoints) => [...prevPoints, { x, y }]);
      }
    }
  };

  // Отрисовка точек
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Очищаем Canvas перед перерисовкой
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Рисуем каждую точку
        points.forEach((point) => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, radiusNode, 0, Math.PI * 2); // Радиус круга 12px (24px диаметр)
          ctx.fillStyle = 'blue';
          ctx.fill();
          ctx.closePath();
        });
      }
    }
  }, [points]);

  return (
    <div onContextMenu={handleContextMenu}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={styles.canvas}
        onClick={handleCanvasClick}
      />
      {menuVisible && <ContextMenu x={menuPosition.x} y={menuPosition.y} onClose={handleCloseMenu} items={menuItems} />}
    </div>
  );
};

export default Area;
