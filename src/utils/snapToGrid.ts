import { IPosition } from '../types/index.type';

export const snapToGrid = (position: IPosition, gridSize: number) => {
  console.log(gridSize);
  return {
    x: Math.round(position.x / gridSize) * gridSize,
    y: Math.round(position.y / gridSize) * gridSize,
  };
};
