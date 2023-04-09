import * as React from 'react';

/* State Management */
import { Tag as TagType } from 'src/generated/types';

/* Components */
import TagItem from 'src/components/Tags';

interface Props {
  tags: TagType[];
}

const TagsToolbarExtension: React.FC<Props> = (props) => {
  return (
    <div className="flex self-end">
      {props.tags.map((tag) => (
        <TagItem key={tag.id} colorString={tag.colorString} value={tag.value} />
      ))}
    </div>
  );
};

export default TagsToolbarExtension;
