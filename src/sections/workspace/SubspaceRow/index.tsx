import * as React from 'react';
import { Button } from 'src/components/Button'
import LogoAvatar, {
  Props as LogoAvatarProps,
} from 'src/components/Sidebar/LogoAvatar';

interface Props {
  logoAvatarProps: LogoAvatarProps;
}

const SubspaceRow: React.FC<Props> = (props) => {
  const { logoAvatarProps } = props;

  return (
    <div className="flex min-w-80 md:w-1/2 border-b border-gray-200 items-center">
      <div className="flex flex-1">
        <div className="flex justify-start items-center">
          <LogoAvatar {...logoAvatarProps} />
          <a className="text-xl text-gray-700">{'Subspace Name'}</a>
        </div>
      </div>
      <div className="flex-1 flex justify-end">
        <Button buttonType="primary" radius="full">{"Join"}</Button>
      </div>
    </div>
  );
};

export default SubspaceRow;
