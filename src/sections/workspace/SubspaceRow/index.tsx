import * as React from 'react';
import { Button } from 'src/components/Button';
import LogoAvatar, {
  Props as LogoAvatarProps,
} from 'src/components/Sidebar/LogoAvatar';
import { Subspace as SubspaceType } from 'src/generated/types';
import Link from 'next/Link';

interface Props {
  logoAvatarProps: LogoAvatarProps;

  subspace?: SubspaceType;
}

const SubspaceRow: React.FC<Props> = (props) => {
  const { logoAvatarProps } = props;

  console.log('props ', props.subspace);

  return (
    <div className="flex min-w-80 md:w-1/2 border-b border-gray-200 items-center">
      <div className="flex flex-1">
        <button className="flex justify-start items-center">
          <LogoAvatar {...logoAvatarProps} />
          <Link href={`/workspace/${props?.subspace?.workspaceId}/${props?.subspace?.id}`}>
            <a className="text-xl text-gray-700">
              {props?.subspace?.name || 'Subspace'}
            </a>
          </Link>
        </button>
      </div>
      <div className="flex-1 flex justify-end">
        <Button buttonType="primary" radius="full">
          {'Join'}
        </Button>
      </div>
    </div>
  );
};

export default SubspaceRow;
