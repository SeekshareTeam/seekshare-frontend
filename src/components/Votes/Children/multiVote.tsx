import * as React from 'react';
import { IconArrowBigTop, IconArrowBigDown } from '@tabler/icons';

import { Numero } from 'src/components/Votes/Children/numero';
import { Vote } from 'src/components/Votes/Children/singleVote';

export type MultiVoteProps = {
  count: number;
  size: string;
  onUpvoteClick: () => void;
  onDownvoteClick: () => void;
  setUp: boolean;
  setDown: boolean;
};

export const MultiVote: React.FC<MultiVoteProps> = (
  props: MultiVoteProps = {
    size: 'medium',
    setUp: false,
    setDown: false,
    count: 0,
    onUpvoteClick: () => {},
    onDownvoteClick: () => {},
  }
) => {
  return (
    <div className="flex flex-col flex-start border-2 items-center border-red-50">
      <Vote
        size={props.size}
        setColor={props.setUp}
        onClick={props.onUpvoteClick}
        iconSymbol={IconArrowBigTop}
      />
      <Numero number={props.count} />
      <Vote
        size={props.size}
        setColor={props.setDown}
        onClick={props.onDownvoteClick}
        iconSymbol={IconArrowBigDown}
      />
    </div>
  );
};
