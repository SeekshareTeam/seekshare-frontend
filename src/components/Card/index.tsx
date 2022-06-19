import * as React from 'react';
import { Maybe } from 'src/generated/types';
import Link from 'next/link';
import Avatar from 'src/components/Avatar';

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
  /**
   *
   */
  gradient?: Maybe<string>;
}

const Card: React.FC<Props> = (props) => {

  return (
    <div className="md:w-96 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      {props.imgUrl ? (
        <div className={`w-full h-44 relative ${props.gradient}`}>
          <Avatar imgUrl={props.imgUrl} className={"absolute bottom-0 left-0 ml-4 -mb-6"} displayHeight={'h-16'} displayWidth={'w-16'} />
        </div>
      ) : (
        <div className="w-full h-40 bg-pink-900"></div>
      )}
      <div className="w-full mt-6 py-2 px-5">
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
