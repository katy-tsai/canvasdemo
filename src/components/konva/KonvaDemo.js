import React, { useRef, useState, useEffect } from "react";
import { useResizeDetector } from "react-resize-detector";
import { Stage, Layer, Image, Rect, Transformer } from "react-konva";
import useImage from "use-image";
const KonvaDemo = () => {
  const { width, height, ref } = useResizeDetector();
  const [isSelected, setIsSelected] = useState(false);
  const [imgProps, setImgProps] = useState({});
  const stageRef = useRef(null);
  const imgRef = useRef(null);
  const rectRef = useRef(null);
  const transFormerRef = useRef(null);
  const [image] = useImage("https://konvajs.github.io/assets/yoda.jpg");
  //MdCropRotate =>icons
  useEffect(() => {
    setImgProps({ x: 0, y: 0, width: width, height: height });
  }, [setImgProps, width, height]);

  const stageClickHandler = (e) => {
    console.log(stageRef.current.getPointerPosition());
  };

  const editorHandler = (e) => {
    setIsSelected(true);
    transFormerRef.current.nodes([imgRef.current]);
    transFormerRef.current.getLayer().batchDraw();
  };
  console.log("imgProps", imgProps);
  console.log("imgref", imgRef.current);

  return (
    <div className="konva-div" ref={ref}>
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        onClick={stageClickHandler}
      >
        <Layer>
          <Image
            ref={imgRef}
            x={imgProps.x}
            y={imgProps.y}
            image={image}
            opacity={1}
            width={imgProps.width}
            height={imgProps.height}
            onClick={editorHandler}
            draggable={false}
            onDragEnd={(e) => {
              setImgProps({
                ...imgProps,
                x: e.target.x(),
                y: e.target.y(),
              });
            }}
            onTransformEnd={(e) => {
              // transformer is changing scale of the node
              // and NOT its width or height
              // but in the store we have only width and height
              // to match the data better we will reset scale on transform end
              const node = imgRef.current;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();

              // we will reset it back
              node.scaleX(1);
              node.scaleY(1);
              setImgProps({
                ...imgProps,
                x: node.x(),
                y: node.y(),
                // set minimal value
                width: Math.max(5, node.width() * scaleX),
                height: Math.max(node.height() * scaleY),
              });
            }}
          />

          {/* {isSelected && (
            <Transformer
              ref={transFormerRef}
              rotateEnabled={false}
              boundBoxFunc={(oldBox, newBox) => {
                // limit resize
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )} */}
        </Layer>
        <Layer globalCompositeOperation={"xor"}>
          <Rect
            ref={rectRef}
            width={imgProps.width}
            height={imgProps.height}
            x={imgProps.x}
            y={imgProps.y}
            fill={"#fff"}
            opacity={0.6}
            draggable={isSelected}
            hitFunc={(ctx, shape) => {
              ctx.rect(0, 0, 200, 200);
              ctx.fillStyle = "#fff";
              ctx.fill();
              ctx.fillStrokeShape(shape);
            }}
          ></Rect>
          {isSelected && (
            <Transformer
              ref={transFormerRef}
              rotateEnabled={false}
              boundBoxFunc={(oldBox, newBox) => {
                // limit resize
                console.log(oldBox);
                console.log(newBox);
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default KonvaDemo;
