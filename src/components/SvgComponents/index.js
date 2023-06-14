import HomeSVG from './home';
import RightArrowSVG from './rightarrow';
import React from 'react';

// eslint-disable-next-line
export default function SvgComponents({ svgRef, isselected }) {
  if (svgRef === 'home') {
    return <HomeSVG />;
  } else if (svgRef === 'rightArrow') {
    return <RightArrowSVG />;
  } else {
    return <div></div>;
  }
  // else if (svgRef === 'downArrow') {
  //   return (<DownCaretSVG />)
  // }
}
