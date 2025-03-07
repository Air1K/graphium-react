import React, { useRef, useState, useEffect } from 'react';
import useContextMenu from '../../hooks/useContextMenu';
import ContextMenu from '../ContextMenu/ContextMenu';
import styles from './Area.module.scss';
import baseStyles from '../../styles/index.module.scss';
import useCanvasActions from '../../hooks/useCanvasActions';
import { STATE } from '../../types/index.type';
export interface AreaProps {
  width?: number;
  height?: number;
  children?: React.ReactNode;
  state?: STATE;
}

const Area = ({ width = 800, height = 600, state = STATE.ENABLE, children }: AreaProps): React.ReactElement => {
  const { menuVisible, menuPosition, handleContextMenu, handleCloseMenu } = useContextMenu();
  const menuItems = [
    { label: 'Action 1', action: 'Action 1' },
    { label: 'Action 2', action: 'Action 2' },
    { label: 'Action 3', action: 'Action 3' },
  ];

  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')

  const { canvasRef, events } = useCanvasActions({ state });

  return (
    <div className={`${baseStyles.root} ${styles.area}`}>
      <canvas {...events} ref={canvasRef} width={width} height={height} className={styles.canvas} />
      {/*{menuVisible && }*/}
      <ContextMenu x={0} y={0} onClose={handleCloseMenu} items={menuItems} />
      {children}
    </div>
  );
};

export default Area;
