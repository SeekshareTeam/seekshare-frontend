import * as React from 'react';
import { Comment as CommentType } from 'src/generated/types';
import { CommentDetail } from 'src/components/Input';
import { GhostButton } from 'src/components/Button';
import { CommentsApiResultType } from 'src/components/Comments/api';
import { Votes } from 'src/components/Votes';
import { upperFirst } from 'lodash';
import CommentFooter from 'src/components/Comments/CommentFooter';
import { MarkdownEditor } from 'src/components/Editor';
import { useAppSelector } from 'src/modules/Redux';
import { shallowEqual } from 'react-redux';
import { AuthCheck } from 'src/components/Modal/AuthCheck';

import CommentBodyLayout from 'src/components/Comments/CommentBody/Layout';

interface CommentBodyProps extends CommentsApiResultType {
  commentResult: CommentType | null;
  isRecursive?: boolean;
}

const CommentBody: React.FC<CommentBodyProps> = ({
  isRecursive = false,
  ...props
}: CommentBodyProps) => {
  /**
   * I need real users.
   * For both comments and posts.
   * Comments and posts.
   * Adding a reply system that only has one depth.
   * Adding polls / multiple choice.
   */

  const [colorUp, setColorUp] = React.useState(false);
  const [colorDown, setColorDown] = React.useState(false);
  const [willReply, setWillReply] = React.useState(false);

  const reduxState = useAppSelector(
    (state) => ({
      auth: state.auth?.data,
    }),
    shallowEqual
  );

  // Comment Reply related states
  const [body, setBody] = React.useState('');

  const onBodyChange = (val: string) => {
    setBody(val);
  };

  const onReplyComment = async (value: string) => {
    await props.onAddComment({
      comment: value,
      commentType: 'comment',
      parentCommentId: props.commentResult?.id,
    });
    setBody('');
  };

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (props?.commentResult?.commentAnswers) {
    }
  }, [props?.commentResult?.commentAnswers]);

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

  const onSelectAnswer = React.useCallback(async () => {
    if (props?.commentResult?.id) {
      await props.onSelectAnswer({
        commentID: props.commentResult.id,
      });
    }
  }, [props?.commentResult?.id, reduxState?.auth]);

  const onReplyToComment = () => {
    setWillReply(!willReply);
  };

  const commentDetails = [
    {
      normalText: upperFirst(`${props?.commentResult?.type} by`),
      linkText: `${props?.commentResult?.user?.firstname} ${props?.commentResult?.user?.lastname}`,
      href: '',
      date: 'Today',
    },
  ];

  return (
    <CommentBodyLayout
      commentDetail={<CommentDetail details={commentDetails} />}
      votes={
        <Votes
          size="small"
          count={props?.commentResult?.upvotes || 0}
          onUpvoteClick={onUpvoteClick}
          onDownvoteClick={onDownvoteClick}
          setUp={colorUp}
          setDown={colorDown}
        />
      }
      comment={props?.commentResult?.comment || ''}
      bestAnswerButton={
        !isRecursive ? (
          <AuthCheck
            message={
              'Please Login to Seekshare to select the best answer. We are going to be '
            }
            className={'flex self-center w-full justify-end'}
          >
            <GhostButton
              selected={props?.commentResult?.commentAnswers}
              textColor={'pink'}
              fillColor={'pink'}
              size={'large'}
              onClick={onSelectAnswer}
            >
              {'Select As Correct Answer'}
            </GhostButton>
          </AuthCheck>
        ) : null
      }
      commentFooter={
        <>
          <CommentFooter toReply={willReply} onPressReply={onReplyToComment} />
          {willReply && (
            <MarkdownEditor
              onSubmit={onReplyComment}
              onBodyChange={onBodyChange}
              body={body}
              size="xs"
              type="comment"
              onPressTags={() => {}}
            />
          )}
          {props?.commentResult?.childComments?.map((cm) => {
            return (
              <CommentBody
                key={cm?.id}
                commentResult={cm}
                onVoteComment={props.onVoteComment}
                onAddComment={props.onAddComment}
                onSelectAnswer={props.onSelectAnswer}
                isRecursive
              />
            );
          })}
        </>
      }
    />
  );
};

export default CommentBody;
