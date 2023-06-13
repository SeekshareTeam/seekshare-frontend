import * as React from 'react';

/* Components */
import UserAvatar from './Avatar';

interface UserCardLayoutProps {
  userAvatar: React.ReactNode;
  name: React.ReactNode;
  userInfo: React.ReactNode;
}

const UserCardLayout: React.FC<UserCardLayoutProps> = (props) => {
  return (
    <div className="inline-flex items-start justify-start space-x-1 bg-nord-4 dark:bg-nord-1 rounded px-2 py-1 w-60">
      <div className="flex ml-4">
        {props.userAvatar}
        <div className="flex-col self-start ml-2">
          {props.name}
          {props.userInfo}
        </div>
      </div>
    </div>
  );
};

interface Props {
  name: string;

  currentPosition: string;
}

const UserCard: React.FC<Props> = (props) => {

  return (
    <UserCardLayout
      userAvatar={<UserAvatar height={64} width={64} />}
      name={<p className="text-nord-0 dark:text-nord-6">{props.name}</p>}
      userInfo={
        <p className="text-sm text-nord-0 dark:text-nord-6">
          {props.currentPosition}
        </p>
      }
    />
  );
};

export default UserCard;
