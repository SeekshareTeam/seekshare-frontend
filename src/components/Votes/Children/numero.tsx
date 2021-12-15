import React from 'react';

type NumeroProps = {
  number: number;
};

export const Numero: React.FC<NumeroProps> = (props: NumeroProps) => {
  return (
    <p className={'text-gray-800 text-base border-2 border-red-500'}>
      {props.number}
    </p>
  );
};

