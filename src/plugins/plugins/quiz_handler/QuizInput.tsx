import * as React from 'react';
import { Quiz as QuizType } from 'src/generated/types';
import MultipleChoiceInput from './MultipleChoiceInput';
import LongFormInput from './LongFormInput';
import Question from './Question';

interface QuizTypeProps {
  quiz: QuizType;
}

const QuizType: React.FC<QuizTypeProps> = (props) => {
  switch (props?.quiz?.type) {
    case 'single':
      return <MultipleChoiceInput quiz={props.quiz} />;
    case 'multiple':
      return <MultipleChoiceInput quiz={props.quiz} />;
    case 'long_form':
      return <LongFormInput />;
    default:
      return null;
  }
};

interface QuizInputLayoutProps {
  subspace: React.ReactNode;

  question: React.ReactNode;

  quizComponent: React.ReactNode;

  tags: React.ReactNode;
}

const QuizInputLayout: React.FC<QuizInputLayoutProps> = (props) => {
  return (
    <div className="flex flex-col my-2 border-b border-nord-2 p-2 w-full">
      {props.subspace}
      {props.question}
      {props.quizComponent}
      {props.tags}
    </div>
  );
};

interface Props {
  quiz: QuizType;

  num: number;
}

const QuizInput: React.FC<Props> = (props) => {
  return (
    <QuizInputLayout
      subspace={
        <div className="bg-nord-6 dark:bg-nord-9 hover:dark:bg-nord-9/50 px-2 py-0.5 rounded-full self-end">
          {props?.quiz?.subspace?.name}
        </div>
      }
      question={
        <Question
          text={
            props?.quiz?.question?.body
              ? props.num + ' ) ' + props?.quiz?.question?.body
              : ''
          }
        />
      }
      quizComponent={<QuizType quiz={props?.quiz} />}
      tags={null}
    />
  );
};

export default QuizInput;
