import * as React from 'react';
import { IconX } from '@tabler/icons';

type TagButtonProps = {
  value: string;
  id: string;
  onClick: (id: string) => void;
  showButton?: boolean;
};

export const Select: React.FC<TagButtonProps> = ({
  showButton = true,
  ...props
}) => {
  return (
    <div className={'rounded self-start inline-flex flex-row py-1'}>
      <span className={'rounded-l-md bg-pink-100 text-pink-400 py-1 pl-1'}>
        {props.value}
      </span>
      {showButton && (
        <button
          className={'rounded-r-md bg-pink-100 text-pink-400 py-1 px-1'}
          onClick={() => {
            props.onClick(props.id);
          }}
        >
          <IconX size={18} />
        </button>
      )}
    </div>
  );
};
