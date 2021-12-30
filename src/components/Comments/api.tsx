import * as React from 'react';

import {
  createComment,
  upvoteComment,
  selectAnswer,
} from 'src/modules/Comment/slice';
import { useCustomMutation } from 'src/modules/Redux';
import {
  useCreateCommentMutation,
  useUpvoteCommentMutation,
  useSelectAnswerMutation,
} from 'src/generated/apollo';

type CommentsApiProps = {
  pid: string;
};

// export type CommentsApiResultType = {
//   onAddComment: (val: { comment: string; commentType: string }) => void;
//   onVoteComment: (val: { commentID: string; type: string }) => void;
//   onSelectAnswer: (val: { commentID: string; selectorID: string }) => void;
// };

const api = (props: CommentsApiProps) => {
  const createCommentMutation = useCustomMutation<
    typeof createComment,
    typeof useCreateCommentMutation
  >(createComment, useCreateCommentMutation, undefined, false);

  const onAddComment = React.useCallback(
    async ({
      comment,
      commentType,
      parentCommentId,
    }: {
      comment: string;
      commentType: string;
      parentCommentId?: string;
    }) => {
      console.log('@ this is being run', parentCommentId, typeof parentCommentId);
      await createCommentMutation({
        variables: { comment, commentType, parentCommentId, postID: props.pid },
      });
    },
    [props.pid, createCommentMutation]
  );

  const upvoteCommentMutation = useCustomMutation<
    typeof upvoteComment,
    typeof useUpvoteCommentMutation
  >(upvoteComment, useUpvoteCommentMutation, undefined, false);

  const onVoteComment = React.useCallback(
    async ({ commentID, type }: { commentID: string; type: string }) => {
      // console.log('@ api comment id', commentID);
      await upvoteCommentMutation({ variables: { commentID, type } });
    },
    [upvoteCommentMutation]
  );

  const selectAnswerMutation = useCustomMutation<
    typeof selectAnswer,
    typeof useSelectAnswerMutation
  >(selectAnswer, useSelectAnswerMutation, undefined, false);

  const onSelectAnswer = React.useCallback(
    async ({ commentID }: { commentID: string }) => {
      await selectAnswerMutation({ variables: { commentID } });
    },
    [selectAnswerMutation]
  );

  return React.useMemo(
    () => ({
      onAddComment,
      onVoteComment,
      onSelectAnswer,
    }),
    [onAddComment, onVoteComment]
  );
};

export type CommentApiType = typeof api;

export type CommentsApiResultType = ReturnType<CommentApiType>;

// export type CommentsApiResult = ReturnType<typeof api>

export default api;
