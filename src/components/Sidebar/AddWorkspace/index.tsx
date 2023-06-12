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
        className="w-12 h-12 overflow-hidden rounded mt-1 rounded-full text-nord-0 hover:text-nord-1 bg-nord-4 dark:bg-nord-1 dark:hover:bg-nord-3 dark:text-nord-6"
      >
        <IconPlus size={36} className="m-auto" />
      </button>
    </>
  );
};

export default AddWorkspace;
