import React from 'react';

interface Props {
  children: React.ReactNode;
}

const CardActionGroup: React.FC<Props> = props => {
  const className = 'flex flex-row justify-end pt-2';

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}

export default CardActionGroup;
