import * as React from 'react';

type Props = {
  imgUrl?: string;

  displayWidth?: string;

  displayHeight?: string;

  onUploadImage: (uploadFile: File) => Promise<void>;
};

const UserAvatar: React.FC<Props> = (props) => {
  console.log('@@@ imgurl', props.imgUrl);
  return (
    <div className="inline-flex">
      <label htmlFor="user_avatar">
        <div
          className={`${props.displayHeight ?? 'h-8'} ${
            props.displayWidth ?? 'w-8'
          } mx-1 rounded-full flex bg-gray-700 hover:bg-gray-800 items-center justify-center cursor-pointer overflow-hidden`}
        >
          <img
            src={
              props.imgUrl ??
              'https://s3-us-west-1.amazonaws.com/s3-lc-upload/assets/default_avatar.jpg'
            }
            className={`${props.displayWidth ?? 'w-8'} rounded-full`}
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
