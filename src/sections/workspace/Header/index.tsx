import * as React from 'react';
// import LogoAvatar, {
//   Props as LogoAvatarProps,
// } from 'src/components/Sidebar/LogoAvatar';
import Avatar from 'src/components/Avatar';

interface Props {
  imgUrl?: string;
  // logoAvatarProps: LogoAvatarProps;
}

const WorkspaceHeader: React.FC<Props> = (props) => {

  return (
    <div className="flex w-full">
      <div className="ml-4">
        <Avatar imgUrl={props.imgUrl} />
      </div>
    </div>
  );
};

export default WorkspaceHeader;
