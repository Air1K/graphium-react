import React, { FC } from 'react';
import styles from './ContextMenu.module.scss';
import { HiMagnifyingGlassPlus } from 'react-icons/hi2';
import { UseCanvasStateReturnType } from '../../hooks/useCanvasState';
import RangeButton from '../ui/RangeButton/RangeButton';
import { MdGrid3X3 } from 'react-icons/md';
import { LuLocateFixed } from 'react-icons/lu';
import LabelButton from '../ui/LabelButton/LabelButton';
import Switch from '../ui/Switch/Switch';

interface ContextMenuProps extends React.ComponentProps<'div'> {
  x: number;
  y: number;
  onClose?: () => void;
  canvasState: UseCanvasStateReturnType;
  exportGraph?: () => void;
  importGraph?: (file: File) => void;
}

const ContextMenu: FC<ContextMenuProps> = ({ x, y, onClose, canvasState, exportGraph, importGraph, ...props }) => {
  const { scale, grid } = canvasState;
  const handleClick = (action?: () => void) => {
    action?.();
    onClose?.();
  };

  return (
    <div
      {...props}
      className={styles.box}
      style={{
        top: y,
        left: x,
      }}
    >
      <ul>
        <li>
          <LabelButton label={'Фиксирование по сетке'} icon={<LuLocateFixed size={12} />}>
            <Switch value={grid.fixed} onChange={() => grid.action.fixed.onOrOff()} />
          </LabelButton>
        </li>
        <li>
          <LabelButton label={'Отобразить сетку'} icon={<LuLocateFixed size={12} />}>
            <Switch value={grid.visible} onChange={() => grid.action.visible.onOrOff()} />
          </LabelButton>
        </li>
        <li>
          <RangeButton
            label={'Сетка'}
            icon={<MdGrid3X3 size={12} />}
            value={String(grid.size)}
            onClickUp={() => grid.action.size.up()}
            onClickDown={() => grid.action.size.down()}
          />
        </li>
        <hr style={{ width: '100%' }} />
        <li>
          <RangeButton
            label={'Масштаб'}
            icon={<HiMagnifyingGlassPlus size={12} />}
            value={`${Math.round(scale.value * 100)} %`}
            onClickUp={() => scale.action.up()}
            onClickDown={() => scale.action.down()}
          />
        </li>
        <hr style={{ width: '100%' }} />
        <li>
          <LabelButton label={'Импорт'} icon={<LuLocateFixed size={12} />}>
            <input
              className={styles.import}
              type='file'
              accept='application/json'
              onChange={(e) => {
                if (e.target.files?.[0]) handleClick(() => importGraph?.(e.target.files![0]));
              }}
            />
          </LabelButton>
        </li>
        <li>
          <LabelButton label={'Экспорт'} icon={<LuLocateFixed size={12} />}>
            <button className={styles.export} onClick={() => handleClick(exportGraph)} />
          </LabelButton>
        </li>
        {/*{items.map((item, index) => (*/}
        {/*  <li key={index} onClick={() => handleClick(item.action)}>*/}
        {/*    {item.label}*/}
        {/*  </li>*/}
        {/*))}*/}
      </ul>
    </div>
  );
};

export default ContextMenu;
