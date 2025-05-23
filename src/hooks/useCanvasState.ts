import { useCallback, useMemo, useRef, useState } from 'react';

type Edge = { from: number; to: number };

function useSteppedState(initial: number, step: number, min: number, max: number) {
  const [value, setValue] = useState(initial);

  const up = useCallback(() => {
    setValue((prev) => Math.min(max, prev + step));
  }, [max, step]);

  const down = useCallback(() => {
    setValue((prev) => Math.max(min, prev - step));
  }, [min, step]);

  return { value, up, down, setValue };
}

export const useCanvasState = () => {
  const scale = useSteppedState(1, 0.2, 0.4, 2);

  const gridSize = useSteppedState(50, 5, 10, 100);

  const [showGrid, setShowGrid] = useState(true);
  const [gridFixed, setGridFixed] = useState(false);

  const toggleShowGrid = useCallback(() => setShowGrid((prev) => !prev), []);
  const toggleGridFixed = useCallback(() => setGridFixed((prev) => !prev), []);

  const offset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const updateOffset = useCallback((dx: number, dy: number) => {
    offset.current.x += dx;
    offset.current.y += dy;
    console.log('Canvas offset:', offset.current);
  }, []);

  const [hoveredEdge, setHoveredEdge] = useState<Edge | null>(null);

  return useMemo(
    () => ({
      grid: {
        visible: showGrid,
        size: gridSize.value,
        fixed: gridFixed,
        action: {
          visible: { onOrOff: toggleShowGrid },
          size: { up: gridSize.up, down: gridSize.down },
          fixed: { onOrOff: toggleGridFixed },
        },
      },
      scale: {
        value: scale.value,
        action: {
          up: scale.up,
          down: scale.down,
        },
      },
      hoveredEdge,
      setHoveredEdge,
      offset,
      updateOffset,
    }),
    [
      showGrid,
      gridSize.value,
      gridSize.up,
      gridSize.down,
      gridFixed,
      toggleShowGrid,
      toggleGridFixed,
      scale.value,
      scale.up,
      scale.down,
      hoveredEdge,
      updateOffset,
    ]
  );
};

export type UseCanvasStateReturnType = ReturnType<typeof useCanvasState>;
