import * as React from 'react';
import { Modal } from 'src/components/Modal';
import TagPopup from 'src/components/Tags/Popup';

import { SpaceRequiredProps } from 'src/utils/types';

interface Props extends SpaceRequiredProps {}

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
      <TagPopup workspaceId={props.workspaceId} subspaceId={props.subspaceId} />
    </Modal>
  );
};

export default React.forwardRef(ManageTags);
