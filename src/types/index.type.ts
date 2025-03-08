export interface IPoint {
  x: number;
  y: number;
}

export type IEdge = Map<number, Map<number, number>>;

export enum STATES_GRAPH {
  CREATE_EDGE = 'create_edge',
  EDIT_EDGE = 'edit_edge',
}

export enum STATE {
  ENABLE = 'enable',
  DISABLE = 'disable',
}
