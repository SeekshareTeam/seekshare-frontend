import * as React from 'react';
import Link from 'next/link';

/* State Management */
import { Subspace as SubspaceType } from 'src/generated/types';

/* Components */
import { Button } from 'src/components/Button';
import { Props as LogoAvatarProps } from 'src/components/Sidebar/LogoAvatar';
import SubspaceCard from 'src/components/Subspace/SubspaceCard';

interface Props {
  logoAvatarProps: LogoAvatarProps;

  subspace: SubspaceType;
}

const SubspaceRow: React.FC<Props> = (props) => {
  return (
    <div className="flex w-full justify-between min-w-80 md:w-1/2 border-b border-nord-5 dark:border-nord-1 items-center">
      <div className="flex flex-1 my-2">
        <button className="flex justify-start items-center">
          <Link
            href={`/workspace/${props?.subspace?.workspaceId}/${props?.subspace?.id}`}
          >
            <SubspaceCard
              subspace={props.subspace}
              titleClassName={
                'text-nord-0 dark:text-nord-6 truncate dark:hover:text-nord-5 transition-all duration-200'
              }
            />
          </Link>
        </button>
      </div>
      <div className="flex flex-1 justify-end">
        <Button variant="primary" size={'medium'} radius="large">
          {'Join'}
        </Button>
      </div>
    </div>
  );
};

export default SubspaceRow;
