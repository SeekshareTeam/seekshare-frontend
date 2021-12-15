import * as React from 'react';
import { IconArrowBigTop, TablerIcon, IconArrowBigDown } from '@tabler/icons';

function getSize(size: string | undefined) {
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
  size: string | undefined;
  iconSymbol: TablerIcon;
}

export const Vote: React.FC<VoteProps> = (props: VoteProps) => {
  const [fillColor, setFillColor] = React.useState('transparent');
  const size = composer.getSize(props.size);
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


type NumeroProps = {
  number: number;
}

export const Numero: React.FC<NumeroProps> = (props: NumeroProps) => {
  return (
    <p className={'text-gray-800 text-2xl border-2 border-red-500'}>
      {props.number}
    </p>
  );
};

type VotesProp = {
  size: string;
};

export const Votes: React.FC<VotesProp> = (props: VotesProp = { size: 'medium' }) => {
  return (
    <div className="flex flex-col flex-start border-2 items-center border-red-50">
      <Vote size={props.size} iconSymbol={IconArrowBigTop} />
      <Numero number={2} />=null
      <Vote size={props.size} iconSymbol={IconArrowBigDown} />
    </div>
  );
};
