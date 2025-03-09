interface IPoint {
  position: IPosition;
}

export type PointsMap = Record<string, IPoint>;

export interface IPosition {
  x: number;
  y: number;
}

export type IEdge = Map<string, Map<string, number>>;

export enum STATES_GRAPH {
  CREATE_EDGE = 'create_edge',
  EDIT_EDGE = 'edit_edge',
}

export enum STATE {
  ENABLE = 'enable',
  DISABLE = 'disable',
}
