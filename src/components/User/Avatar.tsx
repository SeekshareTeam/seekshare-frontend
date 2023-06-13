import * as React from 'react';
import Image from 'next/image';

interface Props {
  height: number;
  width: number;
  imgUrl?: string;
  className?: string;
}

const UserAvatar: React.FC<Props> = (props) => {
  return (
    <Image
      className={`${props.className} rounded`}
      width={props.width}
      height={props.height}
      src={
        props.imgUrl ??
        'https://s3-us-west-1.amazonaws.com/s3-lc-upload/assets/default_avatar.jpg'
      }
      alt="User avatar"
    />
  );
};

export default UserAvatar;
