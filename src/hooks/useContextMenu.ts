import React, { useEffect, useRef, useState } from 'react';

const useContextMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  // const { toggleGrid, updateScaleUp, updateScaleDown, updateGridSizeUp, updateGridSizeDown, toggleGridFixed } =
  //   canvasState;
  // const menuItems = [
  //   { label: '+ Сетка', action: updateGridSizeUp },
  //   { label: '- Сетка', action: updateGridSizeDown },
  //   { label: 'Скрыть / Показать', action: toggleGrid },
  //   { label: 'Включить / Выключить фиксированную сетку', action: toggleGridFixed },
  //   { label: '+ Увеличить масштаб', action: updateScaleUp },
  //   { label: '- Уменьшить масштаб', action: updateScaleDown },
  // ];
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault(); // Отключаем стандартное контекстное меню
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleCloseMenu();
      }
    };

    if (menuVisible) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuVisible]);

  return {
    // grid: {
    //   visible: toggleGrid,
    //   fixedNode: toggleGridFixed,
    //   size: {
    //     up: updateGridSizeUp,
    //     down: updateGridSizeDown,
    //   },
    // },
    menuVisible,
    menuPosition,
    handleContextMenu,
    handleCloseMenu,
    menuRef,
    // menuItems,
  };
};

export default useContextMenu;
