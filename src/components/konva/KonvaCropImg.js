import React, { useState, useRef, useCallback } from "react";
import { useResizeDetector } from "react-resize-detector";
import ReactCrop from "react-image-crop";
import imgSrc from "./img/u976.png";
import { getCroppedImg } from "./imageUtil";

const KonvaCropImg = () => {
  const { width, height, ref } = useResizeDetector();
  const [crop, setCrop] = useState({
    x: 10,
    y: 0,
    aspect: 16 / 9,
    height: 100,
    keepSelection: true,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  const clickHandler = (e) => {
    const image = imgRef.current;
    const cropImg = getCroppedImg(image, completedCrop);
    console.log("cropImg", cropImg);
  };
  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);
  // console.log("completedCrop", completedCrop);

  return (
    <div className="konva-div" ref={ref}>
      <button onClick={clickHandler}>click</button>
      <div style={{ width: `${width}px`, height: `${height}px` }}>
        <ReactCrop
          src={imgSrc}
          crop={crop}
          onImageLoaded={onLoad}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        />
      </div>
    </div>
  );
};

export default KonvaCropImg;
