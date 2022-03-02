import * as React from 'react';

// import { FetchCommentsByPostLazyQueryHookResult } from 'src/generated/apollo';

import CommentBody from 'src/components/Comments/CommentBody';
import { CommentsApiResultType } from 'src/components/Comments/api';
import { Comment as CommentType } from 'src/generated/types';


interface CommentSectionProps extends CommentsApiResultType {
  /**
   * Apollo Return type of fetchComments
   */
  comments: CommentType[];
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
            onSelectAnswer={props.onSelectAnswer}
          />
        );
      })}
    </div>
  );
};

export default CommentSection;
