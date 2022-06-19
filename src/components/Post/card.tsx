import * as React from 'react';
import { Tag as TagType, Content as ContentType, User as UserType } from 'src/generated/types';
import { IconHeart } from '@tabler/icons';

interface PostCardProps {
  votes?: number;
  tags?: TagType[] | null;
  answerCount?: number;
  user?: UserType | null;
  commentCount?: number | null;
  content?: ContentType | null;
  title?: string | null;
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
    <div className={'flex border-b border-1 pb-4 border-gray-100 flex-row lg:w-4/5 md:w-full'}>
      <div
        className={'text-2xl px-2 text-red-900 flex flex-row md:mt-6 md:self-start items-center'}
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
          className={"cursor-pointer"}
        />
      </div>
      <div className={'flex flex-col'}>
        <div>
          <span className="text-sm">{`${props?.user?.firstname || 'Author Information'}`}</span>
        </div>
        <h3 className="text-2xl mb-2">{props.title}</h3>
        <div title="Summary">
          <p>{props.content?.body}</p>
        </div>
        <div className={'flex flex-row'} title="Tags">
          {props.tags?.map((tag) => (
            <button
              id={tag.id}
              onClick={() => {
              }}
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
