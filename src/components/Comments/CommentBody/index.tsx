import * as React from 'react';

import { Title, PostTitle, CommentDetail } from 'src/components/Input';
import { CommentsApiResultType } from 'src/components/Comments/api';
import { Votes } from 'src/components/Votes';
import CommentFooter from 'src/components/Comments/CommentFooter';

// import { IconMessage2, IconArrowBackUp } from '@tabler/icons';

const classes = {
  postContainer: 'border-2 border-gray-500 flex flex-start flex-wrap w-2/3',
  contentInfo: 'w-full',
  title: 'w-full border-2 border-red-500 pl-2',
  votes: 'w-10 flex border-2 border-blue-500 px-1',
  contentContainer: 'w-full flex flex-wrap',
  content: 'flex-1 p-2',
};

type CommentBodyProps = {
  onAddComment: CommentsApiResultType['onAddComment'];
}

const CommentBody: JSX.Element = (props: CommentBodyProps) => {
  /**
   * I need real users.
   * For both comments and posts.
   * Comments and posts.
   * Adding a reply system that only has one depth.
   * Adding polls / multiple choice.
   */
  return (
    <div className="flex flex-wrap w-full">
      <div className="w-full px-2">
        <CommentDetail name={'Filler Name'} href={'Filler Link'} />
      </div>
      <div className="flex w-full">
        <div className={classes.votes}>
          <Votes size="small" />
        </div>
        <div className={classes.content}>{props.comment}</div>
      </div>
      <div className="ml-10">
        <CommentFooter onAddComment={props.onAddComment}/>
      </div>
    </div>
  );
};

export default CommentBody;
