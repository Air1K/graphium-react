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

import { infoPanel } from './infoPanel';

interface Props {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  scale: number;
  showGrid: boolean;
  offset: { x: number; y: number };
}

export const drawGrid = ({ ctx, width, height, scale, showGrid, offset }: Props) => {
  if (!showGrid) return;

  const scaledGridSize = 50 * scale;

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;
  const center = { x: width / 2, y: height / 2 };
  const gridWidth = ((width / scale) % scaledGridSize) / 2;
  const startX = (width - width / scale) / 2 + gridWidth;
  const endX = (width + width / scale) / 2;
  const startY = (height - height / scale) / 2;
  const endY = (height + height / scale) / 2;

  const offsetX = offset.x / scale - startX;

  const delOffsetX = Math.ceil(offsetX / scaledGridSize) * scaledGridSize;
  const delOffsetY = offset.y % scaledGridSize;

  infoPanel({ ctx, text: ` delOffsetX: ${delOffsetX}`, x: 500, y: 0 });
  for (let x = startX - delOffsetX; x < endX; x += scaledGridSize) {
    ctx.moveTo(x, startY);
    ctx.lineTo(x, endY);
  }
  // Вычисляем стартовые линии с учётом offset
  // const delOffsetX = offset.x % scaledGridSize;
  // const offsetXInScale = offset.x + width * (1 - scale);
  // const widthInScale = (width - offset.x) / scale;
  //
  // const delOffsetY = offset.y % scaledGridSize;
  // const offsetYInScale = offset.y + height * (1 - scale);
  // const heightInScale = (height - offset.y) / scale;
  //
  // let horizontalLinesCount = 0;
  // infoPanel({ ctx, text: `oXInS: ${offsetXInScale}, oYInS: ${offsetYInScale}`, x: 0, y: 0 });
  // // Вертикальные линии
  // for (let x = -offsetXInScale + delOffsetX; x < widthInScale; x += scaledGridSize) {
  //   ctx.moveTo(x, -offsetYInScale);
  //   ctx.lineTo(x, heightInScale);
  // }

  // Горизонтальные линии
  // for (let y = -offsetYInScale + delOffsetY; y < heightInScale; y += scaledGridSize) {
  //   ctx.moveTo(-offsetXInScale, y);
  //   ctx.lineTo(widthInScale, y);
  //   horizontalLinesCount++;
  // }
  // infoPanel({ ctx, text: ` ->> ${horizontalLinesCount}`, x: 500, y: 0 });
  ctx.stroke();
  ctx.restore();
};
