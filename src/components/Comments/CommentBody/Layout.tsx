import * as React from 'react';

type CommentBodyLayoutProps = {
  votes: JSX.Element;
  bestAnswerButton: React.ReactNode;
  comment: string;
  commentDetail: JSX.Element;
  commentFooter: React.ReactNode;
};

const CommentBodyLayout: React.FC<CommentBodyLayoutProps> = (props) => {
  return (
    <div className="flex flex-wrap w-full">
      <div className="w-full px-2">{props.commentDetail}</div>
      <div className="flex w-full">
        <div className="w-10 flex border-2 border-blue-500 px-1">
          {props.votes}
        </div>
        <div className="flex-1 p-2 flex flex-wrap">
          <div className="w-full">{props.comment}</div>
          <div className="flex self-center w-full justify-end">
            {props?.bestAnswerButton}
          </div>
        </div>
      </div>
      <div className="ml-10 w-full">{props.commentFooter}</div>
    </div>
  );
};

export default CommentBodyLayout;
