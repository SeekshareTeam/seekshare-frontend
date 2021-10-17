import HomeSVG from './home';
import RightArrowSVG from './rightarrow';
import React, { useState } from 'react';

export default function SvgComponents ({ svgRef, isselected }) {

  const [selected, setSelected] = useState(false);

  console.log('@@ svgComponents', svgRef);
  if (svgRef === 'home') {
    return (<HomeSVG />)
  } else if (svgRef === "rightArrow") {
    return (<RightArrowSVG />);
  } else {
    return (<div></div>)
  }
};
