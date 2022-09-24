import * as React from 'react';
import { IconPlus } from '@tabler/icons';
import { Modal } from 'src/components/Modal';
import { WorkspaceForm } from 'src/components/Workspace/Form';

const AddWorkspace: React.FC = () => {
  const [showWorkspaceForm, setShowWorkspaceForm] = React.useState(false);

  return (
    <>
      <Modal
        blurBackground={true}
        show={showWorkspaceForm}
        onPressBlur={() => {
          setShowWorkspaceForm(false);
        }}
      >
        <WorkspaceForm />
      </Modal>

      <button
        onClick={() => {
          console.log(showWorkspaceForm);
          setShowWorkspaceForm(true);
        }}
        className="w-12 h-12 overflow-hidden rounded mt-1 rounded-full text-lightpen-medium hover:text-lightpen-dark dark:hover:bg-night-extralight dark:hover:text-darkpen-extralight dark:text-darkpen-medium"
      >
        <IconPlus size={36} className="m-auto" />
      </button>
    </>
  );
};

export default AddWorkspace;
