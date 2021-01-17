import React,{useRef} from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { Stage, Layer,Image,Circle} from 'react-konva';
import useImage from 'use-image';
const KonvaDemo = () => {
  const { width, height, ref } = useResizeDetector();
  const stageRef = useRef(null);
  const [image] = useImage("https://konvajs.github.io/assets/yoda.jpg");
  const stageClickHandler = (e)=>{
    console.log(stageRef.current.getPointerPosition());

  }
  return (
    <div className="konva-div" ref={ref}>
      <Stage ref={stageRef} width={width} height={height} onClick={stageClickHandler}>
      <Layer>
        <Image image={image} width={width} height={height}/>
        <Circle x={200} y={200} fill="blue" radius={10} />
      </Layer>
      </Stage>
    </div>
  );
};

export default KonvaDemo;