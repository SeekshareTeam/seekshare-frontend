import * as React from 'react';
import { IconArrowBigTop, IconArrowBigDown } from '@tabler/icons';

import { Numero } from 'src/components/Votes/Children/numero';
import { Vote } from 'src/components/Votes/Children/singleVote';
import { CommentsApiResultType } from 'src/components/Comments/api';

export type MultiVoteProps = {
  count?: number;
  size?: string;
  onUpvoteClick?: () => void;
  onDownvoteClick?: () => void;
  setUp: boolean;
  setDown: boolean;
};

export const MultiVote: JSX.Element = (
  props: MultiVoteProps = { size: 'medium', count: 0 }
) => {

  console.log('@ setDown', props.setDown);

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
