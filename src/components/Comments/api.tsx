import * as React from 'react';

import { createComment, upvoteComment } from 'src/modules/Comment/slice';
import { useCustomMutation } from 'src/modules/Redux';
import {
  useCreateCommentMutation,
  useUpvoteCommentMutation,
} from 'src/generated/apollo';

type CommentsApiProps = {
  pid: string;
};

export type CommentsApiResultType = {
  onAddComment: (val: { comment: string; commentType: string; }) => void;
  onVoteComment: (val: { commentID: string; type: string }) => void;
};

const api = (props: CommentsApiProps) => {
  const createCommentMutation = useCustomMutation<
    typeof createComment,
    typeof useCreateCommentMutation
  >(createComment, useCreateCommentMutation, undefined, false);

  const onAddComment = React.useCallback(
    async ({ comment, commentType }) => {
      await createCommentMutation({
        variables: { comment, commentType, postID: props.pid },
      });
    },
    [props.pid, createCommentMutation]
  );

  const upvoteCommentMutation = useCustomMutation<
    typeof upvoteComment,
    typeof useUpvoteCommentMutation
  >(upvoteComment, useUpvoteCommentMutation, undefined, false);

  const onVoteComment = React.useCallback(
    async ({ commentID, type }) => {
      // console.log('@ api comment id', commentID);
      await upvoteCommentMutation({ variables: { commentID, type } });
    },
    [upvoteCommentMutation]
  );

  return React.useMemo(
    () => ({
      onAddComment,
      onVoteComment,
    }),
    [onAddComment, onVoteComment]
  );
};

export type CommentApiType = typeof api;

// export type CommentsApiResult = ReturnType<typeof api>

export default api;
