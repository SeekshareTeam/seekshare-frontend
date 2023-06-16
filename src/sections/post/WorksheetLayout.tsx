import * as React from 'react';

import { PublishedSet, Quiz as QuizType } from 'src/generated/types';
import QuizInput from 'src/plugins/plugins/quiz_handler/QuizInput';

interface Props {
  publishedSet: PublishedSet | undefined;
}

const WorksheetLayout: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col w-96 md:w-2/3">
      <h1 className="text-2xl font-semibold">{'This is a sample worksheet'}</h1>
      <div className="self-start w-full">
        {props.publishedSet?.quiz?.map((quiz: QuizType, ix) => {
          return <QuizInput key={quiz.id} quiz={quiz} num={ix+1} />;
        })}
      </div>
    </div>
  );
};

export default WorksheetLayout;
