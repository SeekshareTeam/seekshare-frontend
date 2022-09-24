import * as React from 'react';

import { IconUpload } from '@tabler/icons';

type Props = {
  imgUrl?: string;

  userId?: string;

  onUploadImage: (uploadFile: File) => Promise<void>;
};

const UserAvatar: React.FC<Props> = (props) => {
  return (
    <form>
      <label htmlFor="user_avatar">
        <div className="h-8 w-8 mx-1 rounded-full flex bg-gray-700 hover:bg-gray-800 items-center justify-center cursor-pointer overflow-hidden">
          {props.imgUrl ? (
            <img src={props.imgUrl} className="w-8 rounded-full" />
          ) : (
            <IconUpload size={16} className={'dark:text-darkpen-dark'} />
          )}
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
    </form>
  );
};

export default UserAvatar;
