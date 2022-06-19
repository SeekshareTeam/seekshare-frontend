import HomeSVG from './home';
import RightArrowSVG from './rightarrow';
import DownCaretSVG from './downarrow';
import React, { useState } from 'react';

// eslint-disable-next-line
export default function SvgComponents ({ svgRef, isselected }) {

  const [selected, setSelected] = useState(false);
  if (svgRef === 'home') {
    return (<HomeSVG />)
  } else if (svgRef === "rightArrow") {
    return (<RightArrowSVG />);
  } else {
    return (<div></div>)
  }
  // else if (svgRef === 'downArrow') {
  //   return (<DownCaretSVG />)
  // }
}
