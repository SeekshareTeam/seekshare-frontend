import * as React from 'react';
import { SubspaceForm } from 'src/components/Subspace';

interface Props {
  subspaceId: string;
  workspaceId: string;
}

const GeneralManager: React.FC<Props> = (props) => {
  return (
    <SubspaceForm
      onSubmit={() => {}}
      workspaceId={props.workspaceId}
      workspaceName={'Pending'}
    />
  );
};

export default GeneralManager;
