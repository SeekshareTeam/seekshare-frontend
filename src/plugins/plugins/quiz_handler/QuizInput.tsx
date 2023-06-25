import * as React from 'react';
import { Quiz as QuizType } from 'src/generated/types';

import QuizOptionDropdown from 'src/plugins/plugins/quiz_builder/QuizOptionDropdown';
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
  options: React.ReactNode;

  subspace: React.ReactNode;

  question: React.ReactNode;

  quizComponent: React.ReactNode;

  tags: React.ReactNode;
}

const QuizInputLayout: React.FC<QuizInputLayoutProps> = (props) => {
  return (
    <div className="flex flex-col my-2 p-2 w-full">
      <div className="flex justify-end">
        <div className="mx-1">{props.options}</div>
        {props.subspace}
      </div>
      {props.question}
      {props.quizComponent}
      {props.tags}
    </div>
  );
};

interface Props {
  quiz: QuizType;

  num?: number;

  mode: 'read' | 'write';
}

const QuizInput: React.FC<Props> = (props) => {
  const [quizQuestionBody, setQuizQuestionBody] = React.useState('');

  React.useEffect(() => {
    let newQuestionBody = '';
    if (props?.num) {
      newQuestionBody = props?.num + ' ) ';
    }

    if (props?.quiz?.question?.body) {
      newQuestionBody += props.quiz.question.body;
    }

    setQuizQuestionBody(newQuestionBody);
  }, [props.num, props.quiz]);

  return (
    <QuizInputLayout
      options={
        props.mode === 'read' && <QuizOptionDropdown quiz={props.quiz} />
      }
      subspace={
        <div className="bg-nord-6 dark:bg-nord-9 hover:dark:bg-nord-9/50 px-2 py-0.5 rounded-full self-center">
          {props?.quiz?.subspace?.name}
        </div>
      }
      question={<Question text={quizQuestionBody} />}
      quizComponent={<QuizType quiz={props?.quiz} />}
      tags={null}
    />
  );
};

export default QuizInput;
