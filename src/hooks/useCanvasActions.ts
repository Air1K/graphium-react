import { useRef, useState } from 'react';
import { STATE } from '../types/index.type';
import useEdge from './useEdge';
import { usePoint } from './usePoint';
import { useCanvasRenderer } from './useCanvasRenderer';
import { useCanvasHandlers } from './useCanvasHandlers';

interface Props {
  state: STATE;
}

const useCanvasActions = ({ state }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const edgeState = useEdge();
  const pointState = usePoint();
  const { points } = pointState;
  const { edges } = edgeState;
  const [activeEdge, setActiveEdge] = useState<number | null>(null);
  const { redrawCanvas } = useCanvasRenderer({ canvasRef, points, edges, activeEdge });
  const { handleEvent } = useCanvasHandlers({
    canvasRef,
    state,
    pointState,
    redrawCanvas,
    edgeState,
    activeEdge,
    setActiveEdge,
  });

  return {
    canvasRef,
    events: {
      onClick: handleEvent,
      onMouseMove: handleEvent,
      onMouseDown: handleEvent,
      onMouseUp: handleEvent,
      onDoubleClick: handleEvent,
    },
  };
};

export default useCanvasActions;
