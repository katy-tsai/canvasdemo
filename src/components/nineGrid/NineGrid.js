import React,{useRef,useEffect} from 'react';
import {blockWidth,drawBlock,color,PI2} from './_nineGrid/drawUtils';

const NineGrid = () => {
  const gridCanvas = useRef(null);
 
  useEffect(()=>{
    const ctx = gridCanvas.current.getContext("2d");
    let time=0;
    function draw(){
      time++;
      let stime = parseInt(time/20);
      drawBlock({x:0,y:0},color.blue,()=>{
        ctx.beginPath();
        ctx.arc(0,0,30/(stime%3+1),0,PI2);
        ctx.strokeStyle=color.white;
        ctx.lineWidth=13;
        ctx.stroke();
        for(let i=0;i<=8;i++){
          ctx.fillStyle = (stime%8===i)?color.red:color.white;
          if((i+stime)%4!==0){
            ctx.fillRect(60,-4,20,8);
          }        
          ctx.rotate(PI2/8);
        }
      },time,ctx);
      drawBlock({x:1,y:0},color.red,()=>{
        ctx.save();
        ctx.scale(0.8,0.8);
        ctx.translate(-60,-60);
        for(let i=0;i<3;i++){
          ctx.save();
          for(let o=0;o<3;o++){
            ctx.beginPath();
            ctx.arc(0,0,20,0,PI2);
            ctx.fillStyle=color.white;
            if((i+o*2+stime)%5===0){
              ctx.fillStyle=color.yellow;
            }
            ctx.fill();
            ctx.translate(0,60);
          }
          ctx.restore();
          ctx.translate(60,0);        
        }
        ctx.restore();
      },time,ctx);
      drawBlock({x:2,y:0},color.yellow,()=>{

      },time,ctx);
      drawBlock({x:0,y:1},color.yellow,()=>{

      },time,ctx);
      drawBlock({x:1,y:1},color.white,()=>{

      },time,ctx);
      drawBlock({x:2,y:1},color.blue,()=>{

      },time,ctx);
      drawBlock({x:0,y:2},color.red,()=>{

      },time,ctx);
      drawBlock({x:1,y:2},color.blue,()=>{

      },time,ctx);
      drawBlock({x:2,y:2},color.yellow,()=>{

      },time,ctx);
      requestAnimationFrame(draw);

    }
   requestAnimationFrame(draw);
  },[]);
  return (
    <div className="nine-gride">     
      <canvas ref={gridCanvas} width={blockWidth*3} height={blockWidth*3}>
      
      </canvas>
    </div>
  );
};

export default NineGrid;