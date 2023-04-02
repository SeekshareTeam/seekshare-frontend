import * as React from 'react';
import Link from 'next/link';

/* State Management */
import { Subspace as SubspaceType } from 'src/generated/types';

/* Components */
import { Button } from 'src/components/Button';
import LogoAvatar, {
  Props as LogoAvatarProps,
} from 'src/components/Sidebar/LogoAvatar';
import SubspaceCard from 'src/components/Subspace/SubspaceCard';

interface Props {
  logoAvatarProps: LogoAvatarProps;

  subspace?: SubspaceType;
}

const SubspaceRow: React.FC<Props> = (props) => {
  const { logoAvatarProps } = props;

  return (
    <div className="flex min-w-80 md:w-1/2 border-b dark:border-night-extralight items-center">
      <div className="flex flex-1 my-2">
        <button className="flex justify-start items-center">
          <Link
            href={`/workspace/${props?.subspace?.workspaceId}/${props?.subspace?.id}`}
          >
            <a>
              <SubspaceCard subspace={props.subspace} titleClassName={"dark:text-darkpen-dark dark:hover:text-darkpen-medium transition-all duration-200"} />
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
