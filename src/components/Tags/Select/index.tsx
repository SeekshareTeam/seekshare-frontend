import React from 'react';
import { Tag as TagType } from 'src/generated/types';
import { DualIconItem } from 'src/utils/types';

type TagSelectProps = DualIconItem<TagType>;

const TagSelect: React.FC<TagSelectProps> = (props) => {
  return (
    <button
      onClick={() =>{ props?.onSelect?.() }}
      className={
        'w-24 sm:w-full py-2 px-2 text-left bg-white hover:bg-gray-100 text-red-400 flex items-center self-start'
      }
    >
      <>
        <div className="inline-block mr-2">{props.leftIcon}</div>
        <span className={'inline-block px-0.5 text-sm'}>
          {props.item.value}
        </span>
        <div className="flex-1 flex justify-end">{props.rightIcon}</div>
      </>
    </button>
  );
};

export default TagSelect;
