import * as React from 'react';

/* State Management & APIs */
import { QuizOption } from 'src/utils/types';

import { DropdownOption } from 'src/components/Dropdown';
import { useQuestionState } from './Question';
import MultipleChoice from 'src/plugins/plugins/quiz_builder/MultipleChoice';
import QuizType from './QuizType';
import QuizViewer from './QuizViewer';

interface LayoutProps {
  quizType: React.ReactNode;

  leftView: React.ReactNode;

  rightView: React.ReactNode;
}

const QuizBuilderLayout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="flex mx-4">
        <div className="flex-1 mt-2 mb-4">{props.quizType}</div>
      </div>
      <div className="flex flex-1 mx-4">
        <div className="flex-1 flex flex-col">{props.leftView}</div>
        <div className="flex-1 mt-10">{props.rightView}</div>
      </div>
    </div>
  );
};

const QuizControl: React.FC<{
  type: string | undefined;
  question: string;
  setQuestion: (val: string) => void;
  options: QuizOption[];
  setOptions: (options: QuizOption[]) => void;
  workspaceId: string | undefined;
  subspaceId: string | undefined;
}> = (props) => {
  switch (props.type) {
    case 'multiple':
      return (
        <MultipleChoice
          options={props.options}
          setOptions={props.setOptions}
          question={props.question}
          setQuestion={props.setQuestion}
          workspaceId={props.workspaceId}
          subspaceId={props.subspaceId}
        />
      );
    default:
      return null;
  }
};

const useQuizOptions = () => {
  const quizOptionList: DropdownOption[] = React.useMemo(() => {
    return [
      {
        text: 'Multiple Choice',
        type: 'multiple',
        id: 'multiple_choice',
        href: '',
      },
      { text: 'Longform Text', type: 'longform', id: 'longform', href: '' },
    ];
  }, []);

  const [quizType, setQuizType] = React.useState<DropdownOption>(
    quizOptionList[0]
  );

  return {
    quizType,
    setQuizType,
    quizOptionList,
  };
};

const useOptionResponses = () => {
  const [options, setOptions] = React.useState<QuizOption[]>([]);

  return { options, setOptions };
};

interface Props {
  subspaceId?: string;
  workspaceId?: string;
}

const QuizBuilder: React.FC<Props> = (props) => {
  const { quizType, setQuizType, quizOptionList } = useQuizOptions();
  const { options, setOptions } = useOptionResponses();
  const { question, setQuestion } = useQuestionState();

  return (
    <QuizBuilderLayout
      quizType={
        <QuizType
          optionList={quizOptionList}
          onOptionClick={setQuizType}
          option={quizType}
        />
      }
      leftView={
        <QuizControl
          type={quizType.type}
          options={options}
          setOptions={setOptions}
          question={question}
          setQuestion={setQuestion}
          workspaceId={props.workspaceId}
          subspaceId={props.subspaceId}
        />
      }
      rightView={<QuizViewer question={question} options={options} />}
    />
  );
};

export default QuizBuilder;
