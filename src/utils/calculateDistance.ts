import { IPosition } from '../types/index.type';

interface Props {
  point1: IPosition;
  point2: IPosition;
}

export const calculateDistance = ({ point1: { x: x1, y: y1 }, point2: { x: x2, y: y2 } }: Props) => {
  if (
    x1 === undefined ||
    x1 === null ||
    y1 === undefined ||
    y1 === null ||
    x2 === undefined ||
    x2 === null ||
    y2 === undefined ||
    y2 === null
  )
    return 99999;
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};
