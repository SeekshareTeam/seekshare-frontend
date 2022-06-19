import * as React from 'react';
import { Workspace as WorkspaceType } from 'src/generated/types';
import WorkspaceTitle from 'src/components/Workspace/Title';
// import LogoAvatar, {
//   Props as LogoAvatarProps,
// } from 'src/components/Sidebar/LogoAvatar';
import Avatar from 'src/components/Avatar';

interface Props {
  imgUrl?: string;

  workspace: WorkspaceType;

  loading: boolean;
}

const WorkspaceHeader: React.FC<Props> = (props) => {
  const { workspace } = props;

  return (
    <div
      className={`flex w-full md:h-56 ${
        props.workspace?.gradient ? props.workspace.gradient : ''
      } pb-6`}
    >
      <div className="flex ml-4 items-end">
        <Avatar imgUrl={workspace?.url} loading={props.loading} />
        <WorkspaceTitle title={props.workspace.name} loading={props.loading} />
      </div>
    </div>
  );
};

export default WorkspaceHeader;
