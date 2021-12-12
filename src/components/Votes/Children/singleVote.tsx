import * as React from 'react';

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
};

export const Vote: JSX.Element = (props: VoteProps) => {
  const [fillColor, setFillColor] = React.useState('transparent');
  const size = composer.getSize(props.size);
  const classes = `w-full`;
  return (
    <div
      className="border-2 border-blue-500 w-full"
      onMouseEnter={() => {
        setFillColor('orange');
      }}
      onMouseLeave={() => {
        setFillColor('transparent');
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


