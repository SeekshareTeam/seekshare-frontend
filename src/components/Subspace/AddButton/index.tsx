import * as React from 'react';
import { IconPlus } from '@tabler/icons';

interface Props {
  onClick: () => void;
}

const AddButton: React.FC<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="rounded-full shadow-xl dark:bg-nord-3 dark:hover:brightness-110 p-2"
    >
      <IconPlus size={24} />
    </button>
  );
};

export default AddButton;
