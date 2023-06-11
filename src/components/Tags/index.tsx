import * as React from 'react';

import { upperCase } from 'lodash';

interface Props {
  colorString: string;

  value: string;
}

const TagItem: React.FC<Props> = (props) => {

  return (
    <span
      className={`${props.colorString} text-nord-0 dark:text-nord-6 text-xs px-2 py-1 rounded-full whitespace-nowrap`}
    >
      {upperCase(props.value)}
    </span>
  )
};

export default TagItem;
