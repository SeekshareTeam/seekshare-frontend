import React from 'react';

type NumeroProps = {
  number: number;
};

export const Numero: JSX.Element = (props) => {
  return (
    <p className={'text-gray-800 text-2xl border-2 border-red-500'}>
      {props.number}
    </p>
  );
};

