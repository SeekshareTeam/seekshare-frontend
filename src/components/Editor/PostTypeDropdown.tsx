import React from 'react';

/* Tools */
import { PostType, PostTypeOptions } from 'src/utils/types';

import { IconChevronDown } from '@tabler/icons';
import Dropdown, { DropdownOption } from 'src/components/Dropdown';
import { Button } from 'src/components/Button';

export type Props = {
  selectedPostType: PostType;
  onSelect: (value: string) => void;
};

export const getPostTypeText = (postType: PostType): string => {
  return (
    PostTypeOptions.find((x) => x.id === postType)?.text || 'invalid post type'
  );
};

const PostTypeDropdown = (props: Props) => {
  const dropdownRef = React.useRef(null);

  const postText = React.useMemo(
    () => getPostTypeText(props.selectedPostType),
    [props.selectedPostType]
  );

  return (
    <Dropdown
      dropdownRef={dropdownRef}
      optionList={PostTypeOptions}
      position="above"
      horizontalPosition="right"
      onOptionClick={(option: DropdownOption) => {
        props.onSelect(option.id ?? '');
      }}
      dropdownButton={
        <Button variant={null} ref={dropdownRef}>
          <h3>{postText}</h3>
          <IconChevronDown size={16} />
        </Button>
      }
    />
  );
};

export default PostTypeDropdown;
