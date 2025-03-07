import { STATE } from '../types/index.type';

export const wrapHandler = <E>(state: STATE, handler: (event: E) => void) => {
  return (event: E) => {
    if (state === STATE.DISABLE) return;
    handler(event);
  };
};
