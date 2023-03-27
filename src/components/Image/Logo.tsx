
import * as React from 'react';

import ContentLoader from 'react-content-loader';

export const LogoLoader = () => {
  /*
   * Viewport:
   * This is set by providing the width and height values
   * to an SVG element. The viewport determins the size of the SVG container.
   * It basically provides snapshot of how much one can view.
   * ViewBox:
   * This is set by providing four numerical values
   * "min x min y width height".
   * The first two values determine wheere the viewbox is going to "pan" to.
   * The last two values determine the scale of what's inside the Viewport.
   * For example if the Viewport is 50 50,
   * then it means the SVG container is 50 pixels by 50 pixels
   * However, if the ViewBox last two parameters are 100 100, then that means
   * everything inside the 50 by 50 Viewport is actually displaying elements
   * that are of the size 100 by 100.
   *
   * Loader Dimensions:
   * x = 8 + 35 + (50 - 8 - 35) + 145 = 195
   * y = 5 + 20 = 25
   */
  return (
    <ContentLoader
      speed={2}
      width={68}
      height={68}
      viewBox="0 0 64 64"
      backgroundColor="#d9d9d9"
      foregroundColor="#ededed"
    >
      <rect x="2" y="2" rx="4" ry="4" width="64" height="64" />
    </ContentLoader>
  )
}

interface Props {
  imgUrl?: string;

  className: string;
}

const Logo: React.FC<Props> = (props) => {

  return (
    <img
      src={props?.imgUrl}
      className={props.className}
    />
  );
};

export default Logo;
