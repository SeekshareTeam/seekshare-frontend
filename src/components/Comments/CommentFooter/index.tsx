import { IconMessage2, IconArrowBackUp } from '@tabler/icons';

import { CommentsApiResultType } from 'src/components/Comments/api';

type CommentFooterProps = {
  onAddComment: CommentsApiResultType['onAddComment'];
};

const CommentFooter: React.FC<CommentFooterProps> = (props: CommentFooterProps) => {

  props;
  return (
    <div className="flex flex-row">
      <button className="flex flex-row items-center">
        <IconMessage2 size={24} stroke={1} />
        <span className="text-xs">{"reply"}</span>
      </button>
      <div>
        <IconArrowBackUp size={24} stroke={1} />
      </div>
    </div>
  );
};

export default CommentFooter;
