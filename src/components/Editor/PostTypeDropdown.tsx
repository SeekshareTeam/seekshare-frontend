import React from 'react';

import { IconChevronDown } from '@tabler/icons';
import Dropdown, { DropdownProps } from 'src/components/Dropdown';
import { Button } from 'src/components/Button';

// should these be in a separate file?
export type PostType = 'question' | 'note' | 'qna' | 'quiz';
export type QnaType = 'question' | 'answer';

export type Props = {
  selectedPostType: PostType;
  onSelect: DropdownProps['onSelect'];
};

const postTypeOptions: { id: PostType; text: string }[] = [
  { id: 'question', text: 'Question' },
  { id: 'note', text: 'Note' },
  { id: 'qna', text: 'QnA' },
  { id: 'quiz', text: 'Quiz' },
];

export const getPostTypeText = (postType: PostType): string => {
  return (
    postTypeOptions.find(x => x.id === postType)?.text || 'invalid post type'
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
      optionList={postTypeOptions}
      position="above"
      horizontalPosition="right"
      dropdownButton={
        <Button variant={null} ref={dropdownRef}>
          <h3>{postText}</h3>
          <IconChevronDown />
        </Button>
      }
    />
  );
};

export default PostTypeDropdown;
