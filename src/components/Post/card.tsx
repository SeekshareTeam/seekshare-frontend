import * as React from 'react';
import Link from 'next/link';
import {
  // Tag as TagType,
  // Content as ContentType,
  // User as UserType,
  Post as PostType,
} from 'src/generated/types';
import { IconHeart } from '@tabler/icons';

interface PostCardProps extends PostType {
  votes?: number;
  answerCount?: number;
}

export const PostCard: React.FC<PostCardProps> = (props) => {
  /*
    Numero:
     - Number of answers
     - Number of views
     - Number of votes
    Title:
      - Title of the post
    Summary:
      - Body of the post
    Tags:
      - Tags associated with this post
   */
  const [fillColor, setFillColor] = React.useState('transparent');

  return (
    <div
      className={
        'flex border-b pb-4 bg-nord-4 dark:border-nord-2 flex-row lg:w-4/5 md:w-full'
      }
    >
      <div
        className={
          'text-2xl px-2 text-red-900 flex flex-row md:mt-6 md:self-start items-center'
        }
        title="votes"
      >
        <span className="text-lg">{`${props.votes || 3}`}</span>
        <IconHeart
          onMouseEnter={() => {
            setFillColor('#78133b');
          }}
          onMouseLeave={() => {
            setFillColor('transparent');
          }}
          fill={fillColor}
          className={'cursor-pointer'}
        />
      </div>
      <div
        className={
          'flex flex-col text-nord-0 dark:text-nord-6'
        }
      >
        <div>
          <span className="text-sm">{`${
            props?.user?.firstname || 'Author Information'
          }`}</span>
        </div>
        <h3 className="text-2xl mb-2 hover:text-nord-1">
          <Link href={`/post/${props.postId}`}>
            {props.title}
          </Link>
        </h3>
        <div title="Summary">
          <p>
            {props.content.reduce(
              (acc, content) =>
                content?.body ? `${acc}\n\n${content.body}` : acc,
              ''
            )}
          </p>
        </div>
        <div className={'flex flex-row'} title="Tags">
          {props.tags?.map((tag, i) => (
            <button
              key={i}
              id={tag.id}
              onClick={() => { console.log('onClick: post card') }}
              className={
                'rounded-md text-sm mr-0.5 bg-red-100 text-red-400 py-0.5 px-2 hover:bg-red-200'
              }
            >
              {tag.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
