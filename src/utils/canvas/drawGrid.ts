// export const drawGrid = (
//   ctx: CanvasRenderingContext2D,
//   width: number,
//   height: number,
//   gridSize: number,
//   scale: number,
//   showGrid: boolean,
//   offset: { x: number; y: number } = { x: 0, y: 0 }
// ) => {
//   ctx.save();
//
//   ctx.beginPath();
//   ctx.strokeStyle = 'red'; // Сделаем линию красной для наглядности
//   ctx.lineWidth = 2;
//
//   const xPP = (1 - scale) * width;
//
//   // Рисуем линию по оси OX (горизонтально)
//   ctx.moveTo(-offset.x - xPP, height / 2); // Начало линии (левая граница)
//   ctx.lineTo(width - offset.x, height / 2); // Конец линии (правая граница)
//
//   // Рисуем линию по оси OY (вертикально)
//   ctx.moveTo(width / 2, -offset.y); // Начало линии (левая граница)
//   ctx.lineTo(width / 2, height - offset.y); // Конец линии (правая граница)
//
//   ctx.stroke();
//   ctx.closePath();
//   ctx.restore();
// };

interface Props {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  gridSize: number;
  scale: number;
  showGrid: boolean;
  offset: { x: number; y: number };
}

export const drawGrid = ({ ctx, width, height, gridSize, scale, showGrid, offset }: Props) => {
  const scaledGridSize = gridSize * scale; // Шаг с учетом масштаба

  ctx.beginPath();
  ctx.strokeStyle = "#ccc";
  const deltaScale = 1 - scale;
  // Смещение для сетки
  const offsetX = -(width * deltaScale) / 2;
  const offsetY = -(height * deltaScale) / 2;
  // Вертикальные линии

  drawPoint(ctx, offsetX, offsetY, 5);
  for (let x = offsetX; x < width; x += scaledGridSize) {
    ctx.moveTo(x, offsetY);
    ctx.lineTo(x, height);
  }

  // Горизонтальные линии
  for (let y = offsetY; y < height - offsetY; y += scaledGridSize) {
    ctx.moveTo(offsetX, y);
    ctx.lineTo(width, y);
  }

  ctx.stroke();
  ctx.closePath();
};


export const drawPoint = (ctx, x, y, radius = 5) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2); // Рисуем круг
  ctx.fillStyle = "red"; // Цвет точки
  ctx.fill();
  ctx.closePath();
};
