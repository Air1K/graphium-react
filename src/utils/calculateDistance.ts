import { IPoint } from '../types/index.type';

interface Props {
  point1: IPoint;
  point2: IPoint;
}

export const calculateDistance = ({ point1: { x: x1, y: y1 }, point2: { x: x2, y: y2 } }: Props) => {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};
