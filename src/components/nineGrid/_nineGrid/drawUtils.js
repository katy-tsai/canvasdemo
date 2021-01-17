
export const PI = Math.PI;
export const PI2 = Math.PI*2;
export const color={
  red:'#f74456',
  white:'#fff',
  yellow:'#f1da56',
  blue:'#036faf'
}
export const blockWidth = 200;

export function drawBlock(pos,bgColor,draw,time,ctx){
  ctx.save();
  ctx.translate(pos.x*blockWidth,pos.y*blockWidth);
  ctx.fillStyle=bgColor;
  ctx.fillRect(0,0,blockWidth,blockWidth);
  ctx.translate(100,100);
  draw();
  ctx.restore();
}
