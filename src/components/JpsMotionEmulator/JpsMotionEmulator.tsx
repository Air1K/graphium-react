import React, { FC } from 'react';
import { IEdge, OptimalPath, PointsMap } from '../../types/index.type';
import { useJpsMotionEmulatorCanvas } from '../../hooks/useJpsMotionEmulatorCanvas';
import styles from './JpsMotionEmulator.module.scss';
import { UseCanvasStateReturnType } from '../../hooks/useCanvasState';

export interface JpsMotionEmulatorProps {
  optimalPath: OptimalPath[];
  points: PointsMap;
  canvasState: UseCanvasStateReturnType;
  edges: IEdge;
}

const JpsMotionEmulator: FC<JpsMotionEmulatorProps> = ({ optimalPath, points, edges, canvasState }) => {
  const { canvasRef } = useJpsMotionEmulatorCanvas({ optimalPath, points, edges, canvasState });
  return <canvas onClick={() => alert('asdasd')} className={styles.canvas} width={900} height={600} ref={canvasRef} />;
};

export default JpsMotionEmulator;
