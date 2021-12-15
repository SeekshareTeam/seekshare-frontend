import * as React from 'react';

type CommentOverviewProps = {
  numberOfComments: number;
  sortType?: string;
};

const CommentOverview: React.FC<CommentOverviewProps> = (props: CommentOverviewProps) => {
  return (
    <div className="w-full flex border-2 border-purple-500">
      <div className="w-full px-2 w-16">
        <p className="border-2 border-blue-200">
          <span>{props.numberOfComments}</span>
          <span> </span>
          {'Answers'}
        </p>
      </div>
    </div>
  );
};

export default CommentOverview;
