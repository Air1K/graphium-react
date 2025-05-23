import React from 'react';
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
  const { canvasRef, events, canvasState, exportGraph, importGraph } = useCanvasActions({ state });
  const { menuVisible, menuPosition, handleContextMenu, menuRef, handleCloseMenu } = useContextMenu();
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  return (
    <div onContextMenu={handleContextMenu} className={`${baseStyles.root} ${styles.area}`}>
      <canvas {...events} ref={canvasRef} width={width} height={height} className={styles.canvas} />
      {menuVisible && (
        <ContextMenu
          onClose={handleCloseMenu}
          ref={menuRef}
          x={menuPosition.x}
          y={menuPosition.y}
          canvasState={canvasState}
          exportGraph={exportGraph}
          importGraph={importGraph}
        />
      )}
      {children}
    </div>
  );
};

export default Area;
