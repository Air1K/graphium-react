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

interface GridProps {
  ctx: CanvasRenderingContext2D;
  width: number; // ширина canvas в px
  height: number; // высота canvas в px
  scale: number; // ваш zoom (0.5…2)
  offset: { x: number; y: number }; // смещение в px, как вы храните в canvasState
  gridSize?: number; // базовый шаг сетки в «мировых» единицах (пикселях) — по умолчанию 50
}

export const drawGrid = ({ ctx, width, height, scale, offset, gridSize = 50 }: GridProps) => {
  // 1) шаг сетки в экранных пикселях
  const step = gridSize * scale;

  // 2) экранная позиция мирового (0,0):
  //    по X: центр экрана смещён на (1-scale)*width/2, а потом панорама offset.x
  const originScreenX = (width / 2) * (1 - scale) + offset.x;
  const originScreenY = (height / 2) * (1 - scale) + offset.y;

  // 3) фаза — чтобы первый «мировой» нолик встал на экранную координату в [0..step)
  const phaseX = ((originScreenX % step) + step) % step;
  const phaseY = ((originScreenY % step) + step) % step;

  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;

  // 4) рисуем вертикальные
  for (let x = phaseX; x <= width; x += step) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  // 5) рисуем горизонтальные
  for (let y = phaseY; y <= height; y += step) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }

  ctx.stroke();
  ctx.restore();
};
