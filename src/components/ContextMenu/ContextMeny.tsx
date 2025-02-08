import React, { FC } from 'react';

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
      style={{
        position: 'absolute',
        top: y,
        left: x,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
        padding: '10px',
        zIndex: 1000,
      }}
    >
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
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
