import { IPoint } from '../types/index.type';
import { radiusNode } from '../constants/constants';
import { calculateDistance } from './calculateDistance';

export const checkCollision = (mouse: IPoint, list: IPoint[]) => {
  const index = list.findIndex((item) => {
    const distance = calculateDistance({ point1: mouse, point2: item });
    return distance < radiusNode;
  });

  if (index === -1) return null;

  return index;
};
