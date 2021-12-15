import * as React from 'react';

// import { FetchCommentsByPostLazyQueryHookResult } from 'src/generated/apollo';

import CommentBody from 'src/components/Comments/CommentBody';
import { CommentsApiResultType } from 'src/components/Comments/api';
import { Comment as CommentType } from 'src/generated/types';


type CommentSectionProps = {
  /**
   * Apollo Return type of fetchComments
   */
  comments: CommentType[];
  /**
   * on Add Comments
   */
  onAddComment: CommentsApiResultType['onAddComment'];
  /**
   * On Vote Comments
   */
  onVoteComment: CommentsApiResultType['onVoteComment'];
};

const CommentSection: React.FC<CommentSectionProps> = (props: CommentSectionProps) => {
  return (
    <div>
      {props.comments.map((c) => {
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
