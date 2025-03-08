import { IPoint } from '../types/index.type';

export const isPointNearLine = (mouse: IPoint, p1: IPoint, p2: IPoint, threshold: number) => {
  const { x, y } = mouse;
  const { x: x1, y: y1 } = p1;
  const { x: x2, y: y2 } = p2;

  const distance =
    Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) / Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);

  return distance <= threshold;
};
