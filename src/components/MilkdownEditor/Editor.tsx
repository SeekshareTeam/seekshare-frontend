import React from 'react';

import { Milkdown } from '@milkdown/react';

import useWorkspaceSubspaceSelector from '../Editor/useWorkspaceSubspaceSelector';
import useEditor from './useEditor';

import WorkspaceDropdown from '../Editor/WorkspaceDropdown';
import SubspaceDropdown from '../Editor/SubspaceDropdown';

import { TitleInput } from 'src/components/Input';

import text from '../Editor/text.json';

type Props = {
  subspaceId?: string;
  workspaceId?: string;
};

const Editor: React.FC<Props> = (props) => {
  const [postTitle, setTitle] = React.useState('');
  useEditor();

  const workspaceSubspaceSelector = useWorkspaceSubspaceSelector(
    props.workspaceId,
    props.subspaceId
  );

  return (
    <div className="flex flex-col w-1/2">
      <div className="flex flex-row">
        <WorkspaceDropdown
          selectedWorkspaceId={workspaceSubspaceSelector.workspace.selectedId}
          workspaceOptions={workspaceSubspaceSelector.workspace.options}
          onSelect={workspaceSubspaceSelector.workspace.updateSelected}
        />
        <SubspaceDropdown
          selectedSubspaceId={workspaceSubspaceSelector.subspace.selectedId}
          subspaceOptions={workspaceSubspaceSelector.subspace.options}
          onSelect={workspaceSubspaceSelector.subspace.updateSelected}
        />
      </div>
      <TitleInput
        inputProps={{
          onChange: (event) => setTitle(event.target.value),
          value: postTitle,
          placeholder: text.title,
          className: 'flex-1',
        }}
      />
      <Milkdown />
    </div>
  );
};

export default Editor;
