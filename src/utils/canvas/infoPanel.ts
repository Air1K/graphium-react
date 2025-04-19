interface Props {
  ctx: CanvasRenderingContext2D;
  text: string;
  x: number;
  y: number;
}

export const infoPanel = ({ ctx, text, x, y }: Props) => {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(x, y, 400, 50);
  ctx.fillStyle = 'white';
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + 180, y + 25);
  ctx.restore();
};
