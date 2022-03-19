import * as React from 'react';

import { Tag as TagType } from 'src/generated/types';

type SelectCellProps = {
  item: TagType;
  onSelectTag: (selectedTag: { value: string; id: string }) => void;
};

export const SelectCell: React.FC<SelectCellProps> = (props) => {
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    if (
      props.item?.description?.length &&
      props.item.description.length > 100
    ) {
      setDescription(props.item?.description?.slice(0, 100) + '...');
    }
  }, [props.item?.description]);

  return (
    <button
      onClick={() => {
        props.onSelectTag({ value: props.item.value, id: props.item.id });
      }}
      className={
        'flex flex-col py-2 text-left select-all px-1 hover:bg-gray-100 h-24'
      }
    >
      <span
        className={'rounded bg-red-100 text-red-400 py-0.5 px-1 self-start'}
      >
        {props.item.value}
      </span>
      <p>{description}</p>
    </button>
  );
};
