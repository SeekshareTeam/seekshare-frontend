import React from 'react';
import { Tag as TagType } from 'src/generated/types';
import { DualIconItem } from 'src/utils/types';

interface TagItemProps extends DualIconItem<TagType> {
  fill?: boolean;

  border?: boolean;

  generalColor?: string;

  fillColor?: string;

  borderColor?: string;

  textColor?: string;
}

const TagItem: React.FC<TagItemProps> = (props) => {
  let classes = '';
  const borderColor = props.borderColor || props.generalColor;
  const textColor = props.textColor || props.generalColor;
  const fillColor = props.fillColor || props.generalColor;

  if (props.fill) {
    classes += `bg-${fillColor}-700 hover:bg-${fillColor}-500`;
  }

  if (props.border && borderColor) {
    classes += `border border-${borderColor}-700`;
  }

  if (textColor) {
    if (props.fill) {
      classes += ' ' + `text-${textColor}-100`;
    } else {
      classes += ' ' + `text-${textColor}-700`;
    }
  }

  return (
    <div
      className={`py-1 px-2 inline-flex items-center rounded-full ${classes} dark:text-white dark:border dark:border-white`}
    >
      {props.leftIcon}
      <button
        onClick={() => {
          if (props.onSelect) {
            props.onSelect(props.item);
          }
        }}
        className={'px-0.5 text-xs flex-1'}
      >
        {props.item.value}
      </button>
      {props.rightIcon}
    </div>
  );
};

export default TagItem;
