import { IconArrowBackUp } from '@tabler/icons';

import { CommentsApiResultType } from 'src/components/Comments/api';

type CommentFooterProps = {
  onAddComment: CommentsApiResultType['onAddComment'];
};

const CommentFooter: React.FC<CommentFooterProps> = (
  props: CommentFooterProps
) => {
  props;
  return (
    <div className="flex flex-row">
      <button className="flex filter hover:bg-gray-100 px-1 rounded-lg flex-row items-center">
        {/*<IconMessage2 size={24} stroke={1} />*/}
        <div className="flex items-center">
          <IconArrowBackUp size={24} stroke={1} />
          <span className="text-xs">{'reply'}</span>
        </div>
      </button>
    </div>
  );
};

export default CommentFooter;
