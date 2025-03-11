import React, { useEffect, useState } from 'react';
import { UseCanvasStateReturnType } from './useCanvasState';

interface Props {
  canvasState: UseCanvasStateReturnType;
}

const useContextMenu = ({ canvasState }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const { toggleGrid, updateScaleUp, updateScaleDown, updateGridSizeUp, updateGridSizeDown, toggleGridFixed } =
    canvasState;
  const menuItems = [
    { label: '+ Сетка', action: updateGridSizeUp },
    { label: '- Сетка', action: updateGridSizeDown },
    { label: 'Скрыть / Показать', action: toggleGrid },
    { label: 'Включить / Выключить фиксированную сетку', action: toggleGridFixed },
    { label: '+ Увеличить масштаб', action: updateScaleUp },
    { label: '- Уменьшить масштаб', action: updateScaleDown },
  ];
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault(); // Отключаем стандартное контекстное меню
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (menuVisible) {
        handleCloseMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuVisible]);

  return {
    menuVisible,
    menuPosition,
    handleContextMenu,
    handleCloseMenu,
    menuItems,
  };
};

export default useContextMenu;
