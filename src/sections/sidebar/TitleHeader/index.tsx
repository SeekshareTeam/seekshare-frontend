import * as React from 'react';

import { useRouter } from 'next/router';
import { IconChevronDown, IconEdit } from '@tabler/icons';
import { Workspace as WorkspaceType } from 'src/generated/types';

import Dropdown from 'src/components/Dropdown';
import { Button } from 'src/components/Button';
import { Modal } from 'src/components/Modal';
import { SubspaceForm } from 'src/components/Subspace';

interface TitleHeaderProps {
  currentWorkspace: WorkspaceType;
}

const TitleHeader: React.FC<TitleHeaderProps> = (props) => {
  const dropdownRef = React.useRef(null);
  const router = useRouter();

  const [showSubspaceForm, setShowSubspaceForm] = React.useState(false);

  const options = [
    {
      text: 'Create Subspace',
      href: '',
      id: 'create_subspace',
      callback: () => {
        setShowSubspaceForm(true);
      },
    },
    {
      text: 'Settings',
      href: ``,
      id: 'settings',
      callback: () => {
        router.push(`/workspace/${props.currentWorkspace.id}/settings`);
      },
    },
  ];

  return (
    <>
      <Modal
        blurBackground={false}
        show={showSubspaceForm}
        onPressBlur={() => {
          setShowSubspaceForm(false);
        }}
      >
        <div className="z-10 lg:w-1/4 sm:w-80 bg-white dark:bg-dusk-dark rounded-xl">
          <SubspaceForm
            workspaceId={props.currentWorkspace.id}
            workspaceName={props.currentWorkspace.name}
            onSubmit={() => {
              setShowSubspaceForm(false);
            }}
          />
        </div>
      </Modal>

      <div className="relative inline-block m-auto dark:bg-night-medium w-full py-4">
        <div className="flex justify-between items-center w-full px-4 bg-none">
          <div className="flex flex-1 items-center justify-start">
            <Dropdown
              dropdownRef={dropdownRef}
              dropdownButton={
                <Button variant={null} ref={dropdownRef}>
                  <h1 className="font-semibold text-lg">
                    {props.currentWorkspace.name}
                  </h1>
                  <IconChevronDown size={16} />
                </Button>
              }
              optionList={options}
              position={'above'}
              horizontalPosition={'left'}
            />
          </div>
          <Button variant={null}>
            <IconEdit />
          </Button>
        </div>
      </div>
    </>
  );
};

export default TitleHeader;
