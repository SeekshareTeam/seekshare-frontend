import * as React from 'react';

import { PublishedSet, Quiz as QuizType } from 'src/generated/types';
import QuizInput from 'src/plugins/plugins/quiz_handler/QuizInput';

interface Props {
  publishedSet: PublishedSet | undefined;
}

const WorksheetLayout: React.FC<Props> = (props) => {
  const [showSubmit, setShowSubmit] = React.useState(false);
  const [selectedAnswers, setSelectedAnswers] = React.useState<{
    [key: string]: string | string[];
  }>({});

  React.useEffect(() => {
    if (props?.publishedSet?.quiz) {
      const answerObject: { [key: string]: string | string[] } = {};
      props.publishedSet.quiz.forEach((q) => {
        if (q.type === 'multiple') {
          answerObject[q.id] = [];
        } else if (q.type === 'single') {
          answerObject[q.id] = '';
        } else if (q.type === 'long_form') {
          answerObject[q.id] = '';
        }
      });
      setSelectedAnswers(answerObject);
      setShowSubmit(true);
    }
  }, [props.publishedSet?.quiz]);

  return (
    <div className="flex flex-col w-96 md:w-2/3">
      <h1 className="text-2xl font-semibold">
        {props.publishedSet?.title || ''}
      </h1>
      <div className="self-start w-full">
        {props.publishedSet?.quiz?.map((quiz: QuizType, ix) => {
          return (
            <div key={quiz.id} className="border-b dark:border-nord-2">
              <QuizInput
                onSelectAnswer={(val) => {
                  setSelectedAnswers({ ...selectedAnswers, [quiz.id]: val });
                }}
                selectedAnswer={selectedAnswers[quiz.id]}
                mode="write"
                key={quiz.id}
                quiz={quiz}
                num={ix + 1}
              />
            </div>
          );
        })}
        <div className="flex justify-center my-4">
          {showSubmit && (
            <button
              className="p-2 dark:bg-teal-700 rounded"
              onClick={() => {
                console.log('@@@ selected answers', selectedAnswers);
              }}
              disabled={false}
            >
              {'Submit'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorksheetLayout;
