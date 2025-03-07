export interface IPoint {
  x: number;
  y: number;
}

export type IEdge = Map<number, Map<number, number>>;

export enum MODE {
  EDIT = 'edit',
  CREATE = 'create',
  DELETE = 'delete',
}

export enum STATE {
  ENABLE = 'enable',
  DISABLE = 'disable',
}
