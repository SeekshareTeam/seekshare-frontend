import * as React from 'react';
import Image from 'next/image';

export interface Props {
  imgUrl?: string;
  height?: number;
  width?: number;
  rounded?: boolean;
}

const LogoAvatar: React.FC<Props> = (props) => {
  return (
    <div
      className={`border overflow-hidden rounded cursor-pointer border-gray-100 md:w-8 md:h-8 bg-pink-900 ${
        props.rounded ? 'rounded-full' : ''
      }`}
    >
      {props.imgUrl && (
        <Image
          src={props.imgUrl}
          className="rounded"
          width={props.width ?? 50}
          height={props.height ?? 50}
          alt="Logo avatar"
        />
      )}
    </div>
  );
};

export default LogoAvatar;
