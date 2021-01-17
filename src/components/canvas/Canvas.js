import React,{useRef,useState,useEffect,useCallback} from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] =useState(null);
  const startPaint = useCallback((event)=>{
     const coordinates = getCoordinates(event);
     if (coordinates) {
       setIsPainting(true);
       setMousePosition(coordinates);
     }
  },[]);
  const exitPaint = useCallback(()=>{
    setIsPainting(false);
  },[]);
  const paint =useCallback( (event)=>{
    if(isPainting){
      const newMousePosition = getCoordinates(event);
      if(mousePosition && newMousePosition){
        drawLine(mousePosition,newMousePosition);
        setMousePosition(newMousePosition);
      }
    }
  },[isPainting,mousePosition]);
  const drawLine=(originalMousePosition,newMousePosition)=>{
    if (!canvasRef.current) {
      return;
    }
    const canvas =canvasRef.current;
    const context = canvas.getContext('2d');
    if(context){
      context.strokeStyle = '#000';
      context.lineJoin = 'round';
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
    
      context.closePath();
      context.stroke();
    }
  }
  const getCoordinates=(event)=>{
    if (!canvasRef.current) {
      return;
    }
    const canvas =canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;   // relationship bitmap vs. element for X
    const scaleY = canvas.height / rect.height; 
    return {x:(event.pageX - rect.left)* scaleX, y:(event.pageY - rect.top)*scaleY};
  }
  //mousedown
  useEffect(()=>{
    if (!canvasRef.current) {
      return;
    }
    const canvas= canvasRef.current;
    canvas.addEventListener('mousedown', startPaint);
    return () => {
      canvas.removeEventListener('mousedown', startPaint);
    };
  },[startPaint]);
  //mousemove
  useEffect(()=>{
    if (!canvasRef.current) {
      return;
    }
    const canvas= canvasRef.current;
    canvas.addEventListener('mousemove',paint);
    return () => {
      canvas.removeEventListener('mousemove',paint);
    };
  },[paint])
  //mouseup or mouseleave
  useEffect(()=>{
    if (!canvasRef.current) {
      return;
    }
    const canvas= canvasRef.current;
    canvas.addEventListener('mouseup',exitPaint);
    canvas.addEventListener('mouseleave',exitPaint);
    return () => {
      canvas.removeEventListener('mouseup',exitPaint);
      canvas.removeEventListener('mouseleave',exitPaint);
    };
  },[exitPaint])

  return (
    <div className="canvas-div">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
