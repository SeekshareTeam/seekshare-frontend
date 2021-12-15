import * as React from 'react';

import { CommentsApiResultType } from 'src/components/Comments/api';

function getSize(size = null) {
  switch (size) {
    case 'large':
      return 64;
    case 'medium':
      return 36;
    case 'small':
      return 24;
    default:
      return 24;
  }
}

const composer = {
  getSize,
};

type VoteProps = {
  iconSymbol: JSX.Element;
  onClick: () => void;
  setColor: boolean;
};

export const Vote: JSX.Element = (props: VoteProps) => {
  const [fillColor, setFillColor] = React.useState('transparent');
  const size = composer.getSize(props.size);
  const classes = `w-full`;
  React.useEffect(() => {
    if (props.setColor) {
      setFillColor('orange');
    } else {
      setFillColor('transparent');
    }
  }, [props.setColor]);
  return (
    <div
      className={`border-2 border-blue-500 w-full`}
      onMouseEnter={() => {
        if (!props.setColor) {
          setFillColor('orange');
        }
      }}
      onMouseLeave={() => {
        if (!props.setColor) {
          setFillColor('transparent');
        }
      }}
      onClick={() => {
        console.log('on click');
        props.onClick();
      }}
    >
      {props.iconSymbol({
        size: size,
        color: 'gray',
        stroke: 1,
        fill: fillColor,
      })}
    </div>
  );
};
