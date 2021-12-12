import * as React from 'react';
import { IconArrowBigTop, IconArrowBigDown } from '@tabler/icons';

import { Numero } from 'src/components/Votes/Children/numero';
import { Vote } from 'src/components/Votes/Children/singleVote';

export type MultiVoteProps = {
  count?: number;
  size?: string;
};

export const MultiVote: JSX.Element = (props: MultiVoteProps = { size: 'medium' }) => {
  return (
    <div className="flex flex-col flex-start border-2 items-center border-red-50">
      <Vote size={props.size} iconSymbol={IconArrowBigTop} />
      <Numero number={2} />
      <Vote size={props.size} iconSymbol={IconArrowBigDown} />
    </div>
  );
};

