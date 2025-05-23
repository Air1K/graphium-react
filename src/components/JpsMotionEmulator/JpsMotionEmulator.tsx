import React, { FC } from 'react';
import { IEdge, OptimalPath, PointsMap } from '../../types/index.type';
import { useJpsMotionEmulatorCanvas } from '../../hooks/useJpsMotionEmulatorCanvas';

export interface JpsMotionEmulatorProps {
  optimalPath: OptimalPath[];
  points: PointsMap;
  edges: IEdge;
  imageSrc: string;
}

const JpsMotionEmulator: FC<JpsMotionEmulatorProps> = ({ imageSrc, optimalPath, points, edges }) => {
  const { canvasRef } = useJpsMotionEmulatorCanvas({ imageSrc, optimalPath, points, edges });
  return <canvas width={900} height={600} ref={canvasRef} />;
};

export default JpsMotionEmulator;
