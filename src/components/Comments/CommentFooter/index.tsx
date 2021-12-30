import * as React from 'react';
import { IconArrowBackUp, IconX } from '@tabler/icons';

import { CommentsApiResultType } from 'src/components/Comments/api';
import { AuthCheck } from 'src/components/Modal/AuthCheck';

type CommentFooterProps = {
  onPressReply: () => void;
  toReply: boolean;
};

const CommentFooter: React.FC<CommentFooterProps> = (
  props: CommentFooterProps
) => {

  return (
    <AuthCheck className="flex flex-row">
      <button
        onClick={props.onPressReply}
        className="flex filter hover:bg-gray-100 px-1 rounded-lg flex-row items-center"
      >
        {/*<IconMessage2 size={24} stroke={1} />*/}
        <div className="flex items-center">
          {!props.toReply && (
            <>
              <IconArrowBackUp size={24} stroke={1} />
              <span className="text-xs">{'reply'}</span>
            </>
          )}
          {props.toReply && (
            <>
              <IconX size={24} stroke={1} />
              <span className="text-xs">{'cancel'}</span>
            </>
          )}
        </div>
      </button>
    </AuthCheck>
  );
};

export default CommentFooter;
