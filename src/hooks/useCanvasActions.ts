import { useCallback, useMemo, useRef, useState } from 'react';
import { PointsMap, STATE } from '../types/index.type';
import useEdge from './useEdge';
import { usePoint } from './usePoint';
import { useCanvasRenderer } from './useCanvasRenderer';
import { useCanvasHandlers } from './useCanvasHandlers';
import { UseCanvasStateReturnType } from './useCanvasState';
import { usePathFinding } from './usePathFinding';
import { deserializeEdges, serializeEdges } from '../utils/canvas/serialize';

interface Props {
  state: STATE;
  canvasState: UseCanvasStateReturnType;
}

export const useCanvasActions = ({ state, canvasState }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Core logic hooks
  const pointState = usePoint();
  const edgeState = useEdge();
  const pathFinding = usePathFinding({ edges: edgeState.edges });

  const { points } = pointState;
  const { edges } = edgeState;

  // Active edge for highlighting
  const [activeEdge, setActiveEdge] = useState<string | null>(null);

  // Renderer and event handler
  const { redrawCanvas } = useCanvasRenderer({
    canvasRef,
    points,
    edges,
    activeEdge,
    canvasState,
    pathFinding,
  });

  const { handleEvent } = useCanvasHandlers({
    canvasRef,
    state,
    pointState,
    redrawCanvas,
    edgeState,
    activeEdge,
    setActiveEdge,
    canvasState,
    pathFinding,
  });

  const exportGraph = useCallback(() => {
    const serialized = {
      points: points as PointsMap,
      edges: serializeEdges(edges),
    };
    const dataStr = JSON.stringify(serialized, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'graph.json';
    link.click();
    URL.revokeObjectURL(url);
  }, [points, edges]);

  const importGraph = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const json = JSON.parse(reader.result as string);
          if (
            json &&
            typeof json === 'object' &&
            Array.isArray(Object.values(json.points)) &&
            typeof json.edges === 'object'
          ) {
            pointState.setPoints(json.points as PointsMap);
            edgeState.setEdges(deserializeEdges(json.edges));
            redrawCanvas();
          } else {
            console.error('Invalid graph structure');
          }
        } catch (e) {
          console.error('Failed to parse graph file', e);
        }
      };
      reader.readAsText(file);
    },
    [pointState, edgeState, redrawCanvas]
  );

  // Memoized event handlers bundle
  const events = useMemo(
    () => ({
      onClick: handleEvent,
      onMouseMove: handleEvent,
      onMouseDown: handleEvent,
      onMouseUp: handleEvent,
      onDoubleClick: handleEvent,
    }),
    [handleEvent]
  );

  return {
    canvasRef,
    events,
    canvasState,
    exportGraph,
    importGraph,
  };
};

export default useCanvasActions;
