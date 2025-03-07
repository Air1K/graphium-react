import React, { FC } from 'react';
import styles from './ContextMenu.module.scss';
interface MenuItem {
  label: string;
  action: string;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: MenuItem[];
  onClose: () => void;
}
const ContextMenu: FC<ContextMenuProps> = ({ x, y, onClose, items }) => {
  const handleClick = (action: string) => {
    console.log(action);
    onClose();
  };

  return (
    <div
      className={styles.box}
      style={{
        top: y,
        left: x,
      }}
    >
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => handleClick(item.action)}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
