import * as React from 'react';
import { IconX } from '@tabler/icons';

type TagButtonProps = {
  value: string;
  id: string;
  onClick: (id: string) => void;
};

export const Select: React.FC<TagButtonProps> = (props) => {
  return (
    <div className={'rounded flex flex-row py-1'}>
      <span className={'rounded-l-md bg-blue-100 text-blue-400 py-1 pl-1'}>
        {props.value}
      </span>
      <button
        className={'rounded-r-md bg-blue-100 text-blue-400 py-1 px-1'}
        onClick={() => {
          props.onClick(props.id);
        }}
      >
        <IconX size={18} />
      </button>
    </div>
  );
};
