import { useState } from 'react';
import { IPoint } from '../types/index.type';

export const usePoint = () => {
  const [points, setPoints] = useState<IPoint[]>([]);

  const addPoint = (point: IPoint) => {
    setPoints((prevPoints) => [...prevPoints, point]);
  };

  const updatePoint = (index: number, point: IPoint) => {
    setPoints((prevPoints) => prevPoints.map((p, i) => (i === index ? point : p)));
  };

  const removePoint = (index: number) => {
    setPoints((prevPoints) => prevPoints.filter((_, i) => i !== index));
  };

  const clearPoints = () => {
    setPoints([]);
  };

  return { points, addPoint, updatePoint, removePoint, clearPoints };
};

export type UsePointReturnType = ReturnType<typeof usePoint>;
