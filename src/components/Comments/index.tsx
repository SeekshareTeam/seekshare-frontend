import * as React from 'react';
import { MarkdownEditor } from 'src/components/Editor';
import { Title, PostTitle, CommentDetail } from 'src/components/Input';

import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchCommentsByPost } from 'src/modules/Comment/slice';
import { useCustomQuery, useCustomMutation } from 'src/modules/Redux';
import {
  useFetchCommentsByPostLazyQuery,
  useCreateCommentMutation,
} from 'src/generated/apollo';

import { createComment } from 'src/modules/Comment/slice';

import CommentOverview from 'src/components/Comments/CommentOverview';
import CommentSection from 'src/components/Comments/CommentSection';

import { IconMessage2, IconArrowBackUp } from '@tabler/icons';

import useCommentApi from 'src/components/Comments/api';

type CommentThreadProps = {
  pid: string;
};

export const CommentThread: JSX.Element = (props) => {
  /**
   * Comment details should contain:
   * The number of Comments / Answers / Responses
   * Ability to filter comments by comment types
   * The comment Box
   * ability to populate each comment. Pagination bar at the bottom.
   */

  const commentApi = useCommentApi({ pid: props.pid });

  const [body, setBody] = React.useState('');

  const createCommentMutation = useCustomMutation<
    typeof createComment,
    typeof useCreateCommentMutation
  >(createComment, useCreateCommentMutation, undefined, false);

  const onBodyChange = (val) => {
    setBody(val);
  };

  // const onAddComment = React.useCallback(async (value) => {
  //   await commentApi.onAddComment({ comment: value });
  // }, [commentApi.onAddComment]);

  React.useEffect(() => {
    if (props.pid) {
      // fetchCommentsByPostQuery({ variables: { postID: props.pid } });
    }
  }, [props.pid]);

  /**
   * On Add Comment
   */
  const onAddComment = React.useCallback(
    async (comment: string) => {
      console.log('Running this');
      await createCommentMutation({
        variables: { comment, postID: props.pid },
      });
    },
    [props.pid]
  );

  /*
   * Comment on add reply
   */
  const onAddReply = React.useCallback(() => {}, []);

  const reduxState = useSelector((state) => {
    return {
      comments: state.comments.data || [],
    };
  }, shallowEqual);

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
        />
        <CommentSection
          comments={reduxState.comments}
          onAddComment={commentApi.onAddComment}
        />
      </div>
    );
  }

  return <></>;
};
