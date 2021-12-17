import * as React from 'react';
import { MarkdownEditor } from 'src/components/Editor';

import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/modules/Redux';

import CommentOverview from 'src/components/Comments/CommentOverview';
import CommentSection from 'src/components/Comments/CommentSection';

import { CommentsApiResultType } from 'src/components/Comments/api';

import { BaseTab, TabType } from 'src/components/Tabs';

type CommentThreadProps = {
  /**
   *
   */
  pid: string;
  /**
   *
   */
  commentApi: CommentsApiResultType;
};

export const CommentThread: React.FC<CommentThreadProps> = (props) => {
  /**
   * Comment details should contain:
   * The number of Comments / Answers / Responses
   * Ability to filter comments by comment types
   * The comment Box
   * ability to populate each comment. Pagination bar at the bottom.
   */

  // const commentApi = useCommentApi({ pid: props.pid });

  const [body, setBody] = React.useState('');
  const [commentType, setCommentType] = React.useState('comment');

  // const createCommentMutation = useCustomMutation<
  //   typeof createComment,
  //   typeof useCreateCommentMutation
  // >(createComment, useCreateCommentMutation, undefined, false);

  const onBodyChange = (val: string) => {
    setBody(val);
  };

  const onAddComment = React.useCallback(
    async (value) => {
      await props.commentApi.onAddComment({ comment: value, commentType });
      setBody('');
    },
    [props.commentApi.onAddComment, commentType]
  );

  React.useEffect(() => {
    if (props.pid) {
      // fetchCommentsByPostQuery({ variables: { postID: props.pid } });
    }
  }, [props.pid]);

  /**
   * On Add Comment
   */
  // const onAddComment = React.useCallback(
  //   async (comment: string) => {
  //     console.log('Running this');
  //     await createCommentMutation({
  //       variables: { comment, postID: props.pid },
  //     });
  //   },
  //   [props.pid]
  // );

  /*
   * Comment on add reply
   */

  const reduxState = useAppSelector((state) => {
    return {
      comments: state.comments.data || [],
    };
  }, shallowEqual);

  // console.log('@ comments', reduxState.comments);

  const tabs: TabType[] = [
    { tabKey: 'comment', tabValue: 'Comment' },
    { tabKey: 'answer', tabValue: 'Answer' },
    { tabKey: 'challenge', tabValue: 'Challenge' },
    { tabKey: 'question', tabValue: 'Question' },
  ];

  if (reduxState?.comments) {
    return (
      <div className="w-full">
        <CommentOverview numberOfComments={reduxState.comments.length} />
        <MarkdownEditor
          body={body}
          onBodyChange={onBodyChange}
          onSubmit={onAddComment}
          size="small"
          type="comment"
          tabNode={
            <BaseTab
              active={commentType}
              onSelectTab={(val: string) => {
                setCommentType(val);
              }}
              tabs={tabs}
            />
          }
        />
        <CommentSection
          comments={reduxState.comments}
          onAddComment={props.commentApi.onAddComment}
          onVoteComment={props.commentApi.onVoteComment}
        />
      </div>
    );
  }

  return <></>;
};
