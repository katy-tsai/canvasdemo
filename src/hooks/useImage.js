import { useEffect, useState } from 'react';
const defaultState = { image: undefined, status: 'loading' };
const useImage = (url = '', stageWidth, stageHeight) => {
  const [state, setState] = useState(defaultState);
  const { image, status } = state;
  const [scale, setScale] = useState({ x: 1, y: 1 });
  useEffect(() => {
    if (!url) return;
    const img = new Image();
    img.onload = function () {
      const oWidth = this.width;
      const oHeight = this.height;
      const ratio = stageWidth / oWidth;
      const calcHeight = oHeight * ratio;
      if (stageHeight > calcHeight) {
        this.width = stageWidth;
        this.height = calcHeight;
        setScale({
          x: ratio,
          y: calcHeight / oHeight,
          width: stageWidth,
          height: calcHeight
        })
      } else {
        const hratio = stageHeight / oHeight;
        const calcWidth = oWidth * hratio;
        this.width = calcWidth;
        this.height = stageHeight;
        setScale({
          x: calcWidth / oWidth,
          y: hratio,
          width: calcWidth,
          height: stageHeight
        })
      }

      setState({ image: img, status: 'loaded' });
    }
    img.onerror = function () {
      setState({ image: undefined, status: 'failed' });
    }

    img.src = url;
    return function cleanup() {
      setState(defaultState);
    };
  }, [url, stageWidth, stageHeight])

  return [image, scale, status];
};

export default useImage;