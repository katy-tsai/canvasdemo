import React, { useRef } from "react";
import { Layer, Shape, Stage } from "react-konva";
import { useResizeDetector } from "react-resize-detector";
const KonvaShapeDemo = () => {
  const { width, height, ref } = useResizeDetector();
  const stageRef = useRef(null);

  return (
    <div className="konva-div" ref={ref}>
      <Stage ref={stageRef} width={width} height={height}>
        <Layer>
          <Shape
            sokeWidth={4}
            fill="#00D2FF"
            stroke="black"
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(20, 50);
              context.lineTo(220, 80);
              context.quadraticCurveTo(150, 100, 260, 170);
              context.closePath();
              context.fillStrokeShape(shape);
            }}
            hitFunc={(context) => {}}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default KonvaShapeDemo;
