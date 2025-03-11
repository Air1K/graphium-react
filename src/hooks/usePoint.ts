import { useReducer } from 'react';
import { IPosition, PointsMap } from '../types/index.type';
import { v4 as uuidv4 } from 'uuid';

type Action =
  | { type: 'ADD_POINT'; payload: IPosition }
  | { type: 'UPDATE_POINT'; payload: { id: string; position: IPosition } }
  | { type: 'REMOVE_POINT'; payload: string }
  | { type: 'CLEAR_POINTS' };

const pointsReducer = (state: PointsMap, action: Action): PointsMap => {
  switch (action.type) {
    case 'ADD_POINT': {
      const id = uuidv4();
      return { ...state, [id]: { position: action.payload } };
    }
    case 'UPDATE_POINT': {
      if (!state[action.payload.id]) return state;
      return { ...state, [action.payload.id]: { ...state[action.payload.id], position: action.payload.position } };
    }
    case 'REMOVE_POINT': {
      if (!state[action.payload]) return state;
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    case 'CLEAR_POINTS':
      return {};
    default:
      return state;
  }
};

export const usePoint = () => {
  const [points, dispatch] = useReducer(pointsReducer, {});

  return {
    points,
    addPoint: (point: IPosition) => dispatch({ type: 'ADD_POINT', payload: point }),
    updatePoint: (id: string, position: IPosition) => dispatch({ type: 'UPDATE_POINT', payload: { id, position } }),
    removePoint: (id: string) => dispatch({ type: 'REMOVE_POINT', payload: id }),
    clearPoints: () => dispatch({ type: 'CLEAR_POINTS' }),
  };
};

export type UsePointReturnType = ReturnType<typeof usePoint>;
