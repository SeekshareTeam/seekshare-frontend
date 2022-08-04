import * as React from 'react';
import { IconSquarePlus } from '@tabler/icons';
import { Modal } from 'src/components/Modal';
import TagPopup from 'src/components/Tags/Popup';

import { SpaceRequiredProps } from 'src/utils/types';

interface Props extends SpaceRequiredProps {}

const ManageTags: React.FC<Props> = (props) => {
  const [showTagForm, setShowTagForm] = React.useState(false);

  console.log('are you getting re-rendered');

  return (
    <>
      <Modal
        blurBackground={false}
        show={showTagForm}
        onPressBlur={() => {
          setShowTagForm(false);
        }}
      >
        <TagPopup workspaceId={props.workspaceId} subspaceId={props.subspaceId} />
      </Modal>

      <button
        onClick={() => {
          setShowTagForm(true);
        }}
        className="w-12 h-12 overflow-hidden rounded mt-1 hover:opacity-25"
      >
        <IconSquarePlus className="border-2 border-blue-400 hover:border-blue-600 rounded-xl" />
      </button>
    </>
  );
};

export default ManageTags;
