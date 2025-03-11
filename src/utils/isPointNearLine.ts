import { IPosition } from '../types/index.type';

export const isPointNearLine = (mouse: IPosition, p1: IPosition, p2: IPosition, threshold: number) => {
  const { x, y } = mouse;
  const { x: x1, y: y1 } = p1;
  const { x: x2, y: y2 } = p2;
  const distance =
    Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) / Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
  if (distance > threshold) return false;
  const minX = Math.min(x1, x2) - threshold;
  const maxX = Math.max(x1, x2) + threshold;
  const minY = Math.min(y1, y2) - threshold;
  const maxY = Math.max(y1, y2) + threshold;

  return x >= minX && x <= maxX && y >= minY && y <= maxY;
};
