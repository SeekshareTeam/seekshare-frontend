import * as React from 'react';

import { DropdownOption } from 'src/components/Dropdown';
import MultipleChoice from 'src/plugins/plugins/quiz_builder/MultipleChoice';
import QuizType from './QuizType';
import Viewer from 'src/plugins/components/Viewer';

interface LayoutProps {
  quizType: React.ReactNode;

  leftView: React.ReactNode;

  rightView: React.ReactNode;
}

const QuizBuilderLayout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="h-full flex overflow-y-auto">
      <div className="flex-1 flex flex-col mx-4 ">
        <div className="mt-2 mb-4">{props.quizType}</div>
        <div className="flex-1">{props.leftView}</div>
      </div>
      <div className="flex-1">{props.rightView}</div>
    </div>
  );
};

const QuizControl: React.FC<{ type: string | undefined }> = (props) => {
  switch (props.type) {
    case 'multiple':
      return <MultipleChoice />;
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

const QuizBuilder: React.FC = () => {
  const { quizType, setQuizType, quizOptionList } = useQuizOptions();

  return (
    <QuizBuilderLayout
      quizType={
        <QuizType
          optionList={quizOptionList}
          onOptionClick={setQuizType}
          option={quizType}
        />
      }
      leftView={<QuizControl type={quizType.type} />}
      rightView={<Viewer mode={'read'} text={''} />}
    />
  );
};

export default QuizBuilder;
