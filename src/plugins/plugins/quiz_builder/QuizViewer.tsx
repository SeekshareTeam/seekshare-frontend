import * as React from 'react';

import { QuizOption } from 'src/utils/types';
import Viewer from 'src/plugins/components/Viewer';

const QuestionViewer = (props: { text: string }) => {
  return (
    <div className="flex flex-col flex-1 m-2 border dark:border-nord-3 rounded p-2">
      <Viewer mode={'read'} text={props.text} />
    </div>
  );
};

const OptionViewer = (props: {
  text: string;
  num: number;
  isAnswer: boolean;
}) => {
  return (
    <div
      className={`flex flex-1 m-2 border ${
        props.isAnswer ? 'dark:border-green-500' : 'dark:border-nord-3'
      } rounded p-2`}
    >
      <div>
        <p className="text-xs text-nord-4 m-1">{props.num + ')'}</p>
      </div>
      <Viewer mode={'read'} text={props.text} />
    </div>
  );
};

interface QuizViewerProps {
  question: React.ReactNode;

  options: React.ReactNode[];
}

const QuizViewerLayout: React.FC<QuizViewerProps> = (props) => {
  return (
    <div className="flex flex-col">
      {props.question}
      {props.options}
    </div>
  );
};

interface Props {
  question: string;
  options: QuizOption[];
}

const QuizViewer: React.FC<Props> = (props) => {
  return (
    <QuizViewerLayout
      question={<QuestionViewer text={props.question} />}
      options={props.options.map((option, ix) => (
        <OptionViewer
          key={option.key}
          text={option.val}
          num={ix + 1}
          isAnswer={option.answerValue}
        />
      ))}
    />
  );
};

export default QuizViewer;
