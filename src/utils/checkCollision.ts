import { IPosition, PointsMap } from '../types/index.type';
import { radiusNode } from '../constants/constants';
import { calculateDistance } from './calculateDistance';

export const checkCollision = (mouse: IPosition, map: PointsMap): string | null => {
  for (const [id, point] of Object.entries(map)) {
    const distance = calculateDistance({ point1: mouse, point2: point.position });
    if (distance < radiusNode) {
      return id;
    }
  }
  return null;
};
