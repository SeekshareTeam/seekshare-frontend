import * as React from 'react';
import { generate, Pattern } from '@prescott/geo-pattern';

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
  /**
   *
   */
  bgImageUrl?: Maybe<string>;
}

const Card: React.FC<Props> = (props) => {
  const [geoPattern, setGeoPattern] = React.useState<Pattern | undefined>(
    undefined
  );

  React.useEffect(() => {
    (async () => {
      const pattern = await generate({ input: props.title });
      setGeoPattern(pattern);
    })();
  }, [props.title]);

  return (
    <div className="md:w-80 bg-nord-4 rounded-lg border border-gray-200 shadow-md m-2 dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      {props.imgUrl ? (
        <div
          style={{
            backgroundImage: `url('${
              props?.bgImageUrl || geoPattern?.toDataURL()
            }')`,
          }}
          className={'w-full h-44 relative'}
        >
          <Avatar
            imgUrl={props.imgUrl}
            type={'image'}
            className={'absolute bottom-0 left-0 ml-4 -mb-6'}
            displayHeight={'h-16'}
            displayWidth={'w-16'}
          />
        </div>
      ) : (
        <div className="w-full h-40 bg-pink-900"></div>
      )}
      <div className="w-full mt-6 py-2 px-5">
        <Link href={props.pageUrl || ''}>
          <h5 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-nord-6 dark:hover:text-nord-6">
            {props.title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-nord-0 dark:text-nord-6">
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default Card;
