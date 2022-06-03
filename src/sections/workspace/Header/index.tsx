import * as React from 'react';
import LogoAvatar, {
  Props as LogoAvatarProps,
} from 'src/components/Sidebar/LogoAvatar';

interface Props {
  logoAvatarProps: LogoAvatarProps;
}

const WorkspaceHeader: React.FC<Props> = (props) => {
  const { logoAvatarProps } = props;

  return (
    <div className="flex w-full">
      <div className="ml-4">
      <LogoAvatar {...logoAvatarProps} />
      </div>
    </div>
  );
};

export default WorkspaceHeader;
