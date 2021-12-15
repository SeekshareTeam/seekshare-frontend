import * as React from 'react';
import { Comment as CommentType } from 'src/generated/types';
import { CommentDetail } from 'src/components/Input';
import { GhostButton } from 'src/components/Button';
import { CommentsApiResultType } from 'src/components/Comments/api';
import { Votes } from 'src/components/Votes';
import CommentFooter from 'src/components/Comments/CommentFooter';

const classes = {
  postContainer: 'border-2 border-gray-500 flex flex-start flex-wrap w-2/3',
  contentInfo: 'w-full',
  title: 'w-full border-2 border-red-500 pl-2',
  votes: 'w-10 flex border-2 border-blue-500 px-1',
  contentContainer: 'w-full flex flex-wrap',
  content: 'flex-1 p-2 flex flex-wrap',
};

type CommentBodyProps = {
  onAddComment: CommentsApiResultType['onAddComment'];
  onVoteComment: CommentsApiResultType['onVoteComment'];
  commentResult: CommentType;
};

const CommentBody: React.FC<CommentBodyProps> = (props: CommentBodyProps) => {
  /**
   * I need real users.
   * For both comments and posts.
   * Comments and posts.
   * Adding a reply system that only has one depth.
   * Adding polls / multiple choice.
   */

  const [colorUp, setColorUp] = React.useState(false);
  const [colorDown, setColorDown] = React.useState(false);

  React.useEffect(() => {
    // console.log('@ what', props, props.commentVotes);
    if (props?.commentResult?.commentVotes?.type) {
      switch (props.commentResult?.commentVotes.type) {
        case 'up':
          setColorUp(true);
          setColorDown(false);
          break;
        case 'down':
          setColorUp(false);
          setColorDown(true);
          break;
        default:
          setColorUp(false);
          setColorDown(false);
      }
    }
  }, [props?.commentResult?.commentVotes?.type]);

  const onVoteClick = React.useCallback(
    async (voteType: 'up' | 'down') => {
      if (props?.commentResult?.id) {
        await props.onVoteComment({
          commentID: props.commentResult.id,
          type: voteType,
        });
      }
    },
    [props?.commentResult?.id]
  );

  const onUpvoteClick = React.useCallback(async () => {
    await onVoteClick('up');
  }, [onVoteClick]);

  const onDownvoteClick = React.useCallback(async () => {
    await onVoteClick('down');
  }, [onVoteClick]);

  const commentDetails = [
    { normalText: 'Posted by', linkText: 'Filter Name', href: '', date: 'Today' },
  ];

  return (
    <div className="flex flex-wrap w-full">
      <div className="w-full px-2">
        <CommentDetail details={commentDetails} />
      </div>
      <div className="flex w-full">
        <div className={classes.votes}>
          <Votes
            size="small"
            count={props?.commentResult?.upvotes || 0}
            onUpvoteClick={onUpvoteClick}
            onDownvoteClick={onDownvoteClick}
            setUp={colorUp}
            setDown={colorDown}
          />
        </div>
        <div className={classes.content}>
          <div className="w-full">{props?.commentResult?.comment}</div>
          <div className="flex w-full justify-end border-2 border-blue-500">
            <GhostButton size={'large'}>
              {'Select As Correct Answer'}
            </GhostButton>
          </div>
        </div>
      </div>
      <div className="ml-10">
        <CommentFooter onAddComment={props.onAddComment} />
      </div>
    </div>
  );
};

export default CommentBody;
