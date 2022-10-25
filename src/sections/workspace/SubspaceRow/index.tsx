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
    <div className="flex min-w-80 md:w-1/2 border-b border-darkpen-medium items-center">
      <div className="flex flex-1 my-2">
        <button className="flex justify-start items-center">
          <LogoAvatar {...logoAvatarProps} />
          <Link href={`/workspace/${props?.subspace?.workspaceId}/${props?.subspace?.id}`}>
            <a className="text-xl mx-2 text-lightpen-light hover:text-lightpen-dark dark:text-darkpen-dark dark:hover:text-darkpen-light">
              {props?.subspace?.name || 'Subspace'}
            </a>
          </Link>
        </button>
      </div>
      <div className="flex-1 flex justify-end">
        <Button variant="primary" radius="full">
          {'Join'}
        </Button>
      </div>
    </div>
  );
};

export default SubspaceRow;
