import React from 'react';

export type Dimensions = [number, number];

const useDimensions = () => {
  const [dimensions, setDimensions] = React.useState<Dimensions>([0, 0]);

  React.useLayoutEffect(() => {
    const update = () => {
      setDimensions([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', update);
    update();

    return () => window.removeEventListener('resize', update);
  }, []);

  return dimensions;
};

export default useDimensions;
