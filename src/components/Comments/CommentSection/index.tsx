import * as React from 'react';

import { FetchCommentsByPostLazyQueryHookResult } from 'src/generated/apollo';

import CommentBody from 'src/components/Comments/CommentBody';
import CommentFooter from 'src/components/Comments/CommentFooter';
import { CommentsApiResultType } from 'src/components/Comments/api';

type CommentSectionProps = {
  /**
   * Apollo Return type of fetchComments
   */
  comments: FetchCommentsByPostLazyQueryHookResult;
  /**
   * on Add Comments
   */
  onAddComment: CommentsApiResultType['onAddComment'];
};

const CommentSection: JSX.Element = (props: CommentSectionProps) => {
  return (
    <div>
      {props.comments.map((c, ix) => {
        // Things that I need to do. I want to make it so that.
        // Things
        return (
          <CommentBody
            key={c.id}
            commentResult={c}
            onVoteComment={props.onVoteComment}
            onAddComment={props.onAddComment}
          />
        );
      })}
    </div>
  );
};

export default CommentSection;
