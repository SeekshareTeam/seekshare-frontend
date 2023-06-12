import * as React from 'react';
import {
  MultiVote,
  MultiVoteProps,
} from 'src/components/Votes/Children/multiVote';

export const Votes: React.FC<MultiVoteProps> = (
  props: MultiVoteProps = {
    size: 'medium',
    setUp: false,
    setDown: false,
    count: 0,
    onUpvoteClick: () => {
      console.log('onUpvoteClick: Votes');
    },
    onDownvoteClick: () => {
      console.log('onDownvoteClick: Votes');
    },
  }
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
