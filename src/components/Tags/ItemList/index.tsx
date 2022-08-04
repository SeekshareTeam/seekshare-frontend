import React from 'react';
import TagSelect from 'src/components/Tags/Select';
import { Tag as TagType } from 'src/generated/types';

type Props = {
  itemList: TagType[];

  onSelectTag: (item: TagType) => void;

  leftIcon?: React.ReactNode;

  rightIcon?: React.ReactNode;
};

const TagItemList: React.FC<Props> = (props) => {
  return (
    <div className="absolute w-24 sm:w-full shadow flex flex-row flex-wrap content-start md:max-h-24 overflow-y-scroll">
      {props.itemList.map((item) => {
        return (
          <TagSelect
            key={item.id}
            item={item}
            onSelect={() => { props.onSelectTag(item) }}
            leftIcon={props.leftIcon}
            rightIcon={props.rightIcon}
          />
        );
      })}
    </div>
  );
};

export default TagItemList;
