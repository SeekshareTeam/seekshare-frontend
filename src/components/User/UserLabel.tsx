import * as React from 'react';

/* Components */
import UserAvatar from './Avatar';

interface Props {
  name: string;
  imgUrl?: string;
}

const UserLabel: React.FC<Props> = (props) => {
  return (
    <div className="inline-flex items-center justify-center space-x-1">
      <UserAvatar
        displayHeight={'h-5'}
        displayWidth={'w-5'}
        className={'rounded-full'}
        imgUrl={props.imgUrl}
      />
      <span className="font-light text-nord-0 dark:text-nord-6 hidden md:inline">{props.name}</span>
    </div>
  );
};

export default UserLabel;

