import React, { useRef, useState, useEffect } from 'react';
export interface AreaProps {
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

interface Point {
  x: number;
  y: number;
}

const Area = ({ width = 800, height = 600 }: AreaProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [points, setPoints] = useState<Point[]>([]);

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
          ctx.arc(point.x, point.y, 12, 0, Math.PI * 2); // Радиус круга 12px (24px диаметр)
          ctx.fillStyle = 'blue';
          ctx.fill();
          ctx.closePath();
        });
      }
    }
  }, [points]);

  return (
    <canvas
      ref={canvasRef}
      width={width} // Ширина области
      height={height} // Высота области
      style={{ border: '1px solid black', display: 'block', margin: '0 auto' }}
      onClick={handleCanvasClick}
    />
  );
};

export default Area;
