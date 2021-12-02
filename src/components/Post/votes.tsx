import * as React from 'react';
import { IconArrowBigTop, IconArrowBigDown } from '@tabler/icons';

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

export const Vote: JSX.Element = (props) => {
  const [fillColor, setFillColor] = React.useState('transparent');
  const size = composer.getSize(props.size);
  const classes = `w-full`
  return (
    <div
      className=" border-2 border-blue-500 w-full"
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

export const Numero: JSX.Element = (props) => {
  return <p className={'text-gray-800 text-2xl border-2 border-red-500'}>{props.number}</p>;
};

export const Votes: JSX.Element = (props) => {


  return (
    <div className="flex flex-col flex-start border-2 items-center border-red-50">
      <Vote size="medium" iconSymbol={IconArrowBigTop} />
      <Numero number={2} />
      <Vote size="medium" iconSymbol={IconArrowBigDown} />
    </div>
  );
};
