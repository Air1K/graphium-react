export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  gridSize: number,
  scale: number,
  showGrid: boolean,
  offset: { x: number; y: number } = { x: 0, y: 0 }
) => {
  if (!showGrid) return;

  ctx.save();
  ctx.setTransform(scale, 0, 0, scale, 0, 0);

  ctx.beginPath();
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 1 / scale;
  const step = gridSize;

  const offsetX = (offset.x % step) - step;
  const offsetY = (offset.y % step) - step;

  for (let x = offsetX; x < width / scale; x += step) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height / scale);
  }
  for (let y = offsetY; y < height / scale; y += step) {
    ctx.moveTo(0, y);
    ctx.lineTo(width / scale, y);
  }

  ctx.stroke();
  ctx.closePath();
  ctx.restore();
};
