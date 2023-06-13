import * as React from 'react';
import Image from 'next/image';

type Props = {
  imgUrl?: string;

  height?: number;
  width?: number;

  onUploadImage: (uploadFile: File) => Promise<void>;
};

const UserAvatar: React.FC<Props> = (props) => {
  const height = props.height ?? 64;
  const width = props.width ?? 64;

  return (
    <div className="inline-flex">
      <label htmlFor="user_avatar">
        <div
          className={`${height} ${width} mx-1 rounded-full flex bg-gray-700 hover:bg-gray-800 items-center justify-center cursor-pointer overflow-hidden`}
        >
          <Image
            src={
              props.imgUrl ??
              'https://s3-us-west-1.amazonaws.com/s3-lc-upload/assets/default_avatar.jpg'
            }
            width={width}
            height={height}
            className={'rounded-full'}
            alt="User Avatar"
          />
        </div>
      </label>
      <input
        className="hidden"
        name={'user_avatar'}
        id={'user_avatar'}
        type="file"
        accept="image/*"
        onChange={async (e) => {
          if (e.target.files && e.target.files[0]) {
            await props.onUploadImage(e.target.files[0]);
          }
        }}
      />
    </div>
  );
};

export default UserAvatar;
