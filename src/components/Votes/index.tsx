import * as React from 'react';
import {
  MultiVote,
  MultiVoteProps,
} from 'src/components/Votes/Children/multiVote';

export const Votes: JSX.Element = (
  props: MultiVoteProps = { size: 'medium' }
) => {
  return (
    <MultiVote
      size={props.size}
      count={props.count}
      onUpvoteClick={props.onUpvoteClick}
      onDownvoteClick={props.onDownvoteClick}
      setUp={props.setUp}
      setDown={props.setDown}
    />
  );
};
