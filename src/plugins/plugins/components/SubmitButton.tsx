import React from 'react';

interface Props {
  onClick: React.HTMLAttributes<HTMLButtonElement>['onClick'];
}

const SubmitButton: React.FC<Props> = props => {
  return <button onClick={props.onClick}>{'Submit'}</button>;
};

export default SubmitButton;
