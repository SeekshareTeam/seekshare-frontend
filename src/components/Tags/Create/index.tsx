import * as React from 'react';

/* State Management */
import { SpaceRequiredProps } from 'src/utils/types';
import { Tag as TagType } from 'src/generated/types';

/* Components */
import { Modal } from 'src/components/Modal';
import TagPopup from 'src/components/Tags/Popup';

interface Props extends SpaceRequiredProps {
  onSubmitTags: (tags: TagType[]) => void;
}

export interface ManageTagsHandle {
  showModal: () => void;
}

const ManageTags: React.ForwardRefRenderFunction<ManageTagsHandle, Props> = (
  props,
  ref
) => {
  const [showTagForm, setShowTagForm] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    showModal: () => {
      setShowTagForm(true);
    },
  }));

  return (
    <Modal
      blurBackground={false}
      show={showTagForm}
      onPressBlur={() => {
        setShowTagForm(false);
      }}
    >
      <TagPopup workspaceId={props.workspaceId} subspaceId={props.subspaceId}
        onSubmitTags={props.onSubmitTags}
      />
    </Modal>
  );
};

export default React.forwardRef(ManageTags);
