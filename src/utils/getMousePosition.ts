export const getMousePosition = (event: React.MouseEvent<HTMLCanvasElement>, ref: React.RefObject<HTMLCanvasElement>) => {
  const canvas = ref.current;
  if (!canvas) return { x: 0, y: 0 };
  const rect = canvas.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
};
