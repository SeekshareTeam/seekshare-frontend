import * as React from 'react';

import { IconMenu2 } from '@tabler/icons';

const Hamburger: React.FC = () => {
  const [color, setColor] = React.useState('#d1d5db');

  return (
    <button
      onMouseEnter={() => {
        setColor('#9ca3af')
      }}
      onMouseLeave={() => {
        setColor('#d1d5db')
      }}
    >
      <IconMenu2 size={36} stroke={1} color={color} />
    </button>
  );
};

export default Hamburger;
