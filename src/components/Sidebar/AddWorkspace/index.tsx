import * as React from 'react';
import { IconPlus } from '@tabler/icons';
import { Modal } from 'src/components/Modal';
import { WorkspaceForm } from 'src/components/Workspace/Form';

const AddWorkspace: React.FC = () => {
  const [showWorkspaceForm, setShowWorkspaceForm] = React.useState(false);

  return (
    <>
      <Modal
        blurBackground={false}
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
        className="w-12 h-12 overflow-hidden rounded mt-1 hover:opacity-25"
      >
        <IconPlus size={36} className="m-auto" />
      </button>
    </>
  );
};

export default AddWorkspace;
