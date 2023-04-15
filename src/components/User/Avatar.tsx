import * as React from 'react';

interface Props {
  displayHeight: string;

  displayWidth: string;

  imgUrl?: string;

  className?: string;
}

const UserAvatar: React.FC<Props> = (props) => {
  return (
    <img
      className={`${props.displayHeight} ${props.displayWidth} ${props.className} rounded`}
      src={
        props.imgUrl ??
        'https://s3-us-west-1.amazonaws.com/s3-lc-upload/assets/default_avatar.jpg'
      }
    />
  );
};

export default UserAvatar;
