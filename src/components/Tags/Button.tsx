import * as React from 'react';

import { isEmpty } from 'lodash';

import { Tag as TagType } from 'src/generated/types';

import { IconTags } from '@tabler/icons';
import ManageTags, { ManageTagsHandle } from 'src/components/Tags/Create';

export const useTagHook = () => {
  const [currentTags, setCurrentTags] = React.useState<TagType[]>([]);

  return {
    currentTags,
    setCurrentTags,
  };
};

interface Props {
  currentTags: TagType[];
  setCurrentTags: (tags: TagType[]) => void;
  workspaceId?: string;
  subspaceId?: string;
  tagRef: React.RefObject<ManageTagsHandle>;
}

const TagButton: React.FC<Props> = (props) => {
  if (isEmpty(props.workspaceId) || isEmpty(props.subspaceId)) {
    return null;
  }

  return (
    <div className="inline-flex items-center">
      <ManageTags
        ref={props.tagRef}
        onSubmitTags={(tags: TagType[]) => {
          props.setCurrentTags(tags);
          props.tagRef.current?.closeModal();
        }}
        workspaceId={props.workspaceId}
        subspaceId={props.subspaceId}
      />
      <button
        onClick={() => {
          props.tagRef.current?.showModal();
        }}
        className="hover:stroke-nord-3"
      >
        <IconTags />
      </button>
    </div>
  );
};

export default TagButton;
