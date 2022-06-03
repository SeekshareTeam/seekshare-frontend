import * as React from 'react';
import { Maybe } from 'src/generated/types';
import Link from 'next/link';

export interface Props {
  /**
   *
   */
  title: string;
  /**
   *
   */
  imgUrl?: Maybe<string>;
  /**
   *
   */
  description?: Maybe<string>;
  /**
   *
   */
  pageUrl?: Maybe<string>;
}

const Card: React.FC<Props> = (props) => {
  return (
    <div className="md:w-64 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      {props.imgUrl ? (
        <img className="w-full h-40" src={props.imgUrl} />
      ) : (
        <div className="w-full h-40 bg-pink-900"></div>
      )}
      <div className="w-full py-2 px-5">
        <Link href={props.pageUrl || ""}>
          <a>
            <h5 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
              {props.title}
            </h5>
          </a>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default Card;
