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
    <div className="inline-flex items-start justify-start space-x-1 dark:bg-night-medium rounded px-2 py-1 w-60">
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
      userAvatar={<UserAvatar displayHeight={'h-16'} displayWidth={'w-16'} />}
      name={<p className="dark:text-darkpen-medium">{props.name}</p>}
      userInfo={
        <p className="text-sm dark:text-darkpen-dark">
          {props.currentPosition}
        </p>
      }
    />
  );
};

export default UserCard;
