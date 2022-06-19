import * as React from 'react';

export interface Props {
  imgUrl?: string;
  height?: number;
  width?: number;
  rounded?: boolean;
}

const LogoAvatar: React.FC<Props> = (props) => {
  return (
    <div className={`border-2 overflow-hidden rounded cursor-pointer border-gray-100 ${props.rounded ? 'rounded-full' : ''}`}>
      {props.imgUrl ? (
        <img
          src={props.imgUrl}
          className="rounded"
          width={`${props.width ? props.width : 50}`}
          height={`${props.height ? props.height : 50}`}
        />
      ) : (
        <div className="bg-pink-900 w-12 h-12" />
      )}
    </div>
  );
};

export default LogoAvatar;
