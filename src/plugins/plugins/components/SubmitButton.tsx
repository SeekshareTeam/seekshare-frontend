import React from 'react';

interface Props {
  onClick: React.HTMLAttributes<HTMLButtonElement>['onClick'];
}

const SubmitButton: React.FC<Props> = props => {
  const className = 'bg-teal-700 py-1 px-4 rounded';
  return (
    <button className={className} onClick={props.onClick}>
      {'Submit'}
    </button>
  );
};

export default SubmitButton;
