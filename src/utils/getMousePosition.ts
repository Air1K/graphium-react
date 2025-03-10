export const getMousePosition = (
  event: React.MouseEvent<HTMLCanvasElement>,
  ref: React.RefObject<HTMLCanvasElement>,
  scale: number,
  offset: { x: number; y: number }
) => {
  const canvas = ref.current;
  if (!canvas) return { x: 0, y: 0 };
  const rect = canvas.getBoundingClientRect();
  console.log(scale, (rect.width / 2) * (1 - scale), offset);
  const x = (event.clientX - rect.left - offset.x - (rect.width / 2) * (1 - scale)) / scale;
  const y = (event.clientY - rect.top - offset.y - (rect.height / 2) * (1 - scale)) / scale;
  return { x, y };
};

// export const getMousePosition = (
//   event: React.MouseEvent<HTMLCanvasElement>,
//   ref: React.RefObject<HTMLCanvasElement>,
// ) => {
//   const canvas = ref.current;
//   if (!canvas) return { x: 0, y: 0 };
//   const rect = canvas.getBoundingClientRect();
//   const ctx = canvas.getContext('2d');
//   if (!ctx) return { x: 0, y: 0 };
//
//   const transform = ctx.getTransform();
//   const scaleX = transform.a;
//   const scaleY = transform.d;
//   const translateX = transform.e;
//   const translateY = transform.f;
//   const x = (event.clientX - rect.left - translateX) / scaleX;
//   const y = (event.clientY - rect.top - translateY) / scaleY;
//   return { x, y };
// };
