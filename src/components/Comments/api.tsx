import * as React from 'react';

import { createComment } from 'src/modules/Comment/slice';
import { useCustomQuery, useCustomMutation } from 'src/modules/Redux';
import { useCreateCommentMutation } from 'src/generated/apollo';

type CommentsApiProps = {
  pid: string;
}

export type CommentsApiResultType = {
  onAddComment: (val: { comment: string }) => void;
}

const api = (props: CommentsApiProps) => {

  const createCommentMutation = useCustomMutation<
    typeof createComment,
    typeof useCreateCommentMutation
  >(createComment, useCreateCommentMutation, undefined, false);

  const onAddComment = React.useCallback(async ({ comment }) => {
    await createCommentMutation({ variables: { comment, postID: props.pid } })
  }, [props.pid]);

  return React.useMemo(() => ({
    onAddComment
  }), [onAddComment])
};

// export type CommentsApiResult = ReturnType<typeof api>

export default api;
