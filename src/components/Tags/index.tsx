import * as React from 'react';

import { upperCase } from 'lodash';

interface Props {
  colorString: string;

  value: string;
}

const TagItem: React.FC<Props> = (props) => {

  console.log('@@@ tagprops', props);

  return (
    <span
      className={`${props.colorString} text-darkpen-medium text-xs px-2 py-1 rounded-full whitespace-nowrap`}
    >
      {upperCase(props.value)}
    </span>
  )
};

export default TagItem;
