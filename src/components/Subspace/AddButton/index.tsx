import * as React from 'react';
import { IconPlus } from '@tabler/icons';

interface Props {
  onClick: () => void;
};

const AddButton: React.FC<Props> = (props) => {
  return (
    <button onClick={props.onClick} className="rounded-full shadow-xl dark:bg-gray-50 dark:hover:bg-gray-100 p-2">
      <IconPlus size={24} />
    </button>
  )
};

export default AddButton;
