import * as React from 'react';

/* State Management & APIs */
import { QuizOption } from 'src/utils/types';
import { useCreateQuizMutation } from 'src/generated/apollo';

import Question, { useQuestionState } from './Question';
import OptionControl from './OptionControl';
import { BaseTab } from 'src/components/Tabs';
import { Button } from 'src/components/Button';

interface LayoutProps {
  tabs: React.ReactNode;
  question: React.ReactNode;
  optionControl: React.ReactNode;
  submitBox: React.ReactNode;
}

const MultipleChoiceLayout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="h-full overflow-y-auto flex flex-col">
      <div className="flex-1 flex flex-col">
        <div className="mt-2 mb-4">{props.tabs}</div>
        {props.question}
        <div className="border border-darkpen-light dark:border-lightpen-light my-2"></div>
        <div style={{ flex: '1 1 0' }} className="overflow-y-auto">
          {props.optionControl}
        </div>
      </div>
      <div className="h-14">{props.submitBox}</div>
    </div>
  );
};

const useResponseTypes = () => {
  const responseTypes = React.useMemo(() => {
    return [
      { tabKey: 'single', tabValue: 'Single' },
      { tabKey: 'multiple', tabValue: 'Multiple' },
      { tabKey: 'sequential', tabValue: 'Sequence' },
    ];
  }, []);

  const [active, setActive] = React.useState(responseTypes[0].tabKey);

  return { active, setActive, responseTypes };
};

interface Props {
  options: QuizOption[];

  setOptions: (options: QuizOption[]) => void;
}

const MultipleChoice: React.FC<Props> = (props) => {
  /*
   * Should display

   * The question header or title
   * A very easy to add options and remove options
   */
  const { active, setActive, responseTypes } = useResponseTypes();
  const [createQuizMutation, { data }] = useCreateQuizMutation();
  const { question, setQuestion } = useQuestionState();

  return (
    <MultipleChoiceLayout
      tabs={
        <BaseTab
          tabs={responseTypes}
          active={active}
          onSelectTab={(tabKey: string) => {
            setActive(tabKey);
          }}
        />
      }
      question={<Question value={question} setValue={setQuestion} />}
      optionControl={
        <OptionControl
          options={props.options}
          setOptions={props.setOptions}
          responseType={active}
        />
      }
      submitBox={
        <div className="h-full flex items-center">
          <div className="flex-1"> </div>
          <div className="flex-1 flex justify-end">
            <Button
              variant={'primary'}
              size={'large'}
              radius={'large'}
              onClick={async () => {
                await createQuizMutation({
                  variables: {
                    quizInput: {
                      body: question,
                      type: active,
                      options: props.options.map((option) => ({
                        body: option.val,
                        isAnswer: true,
                      })),
                    },
                  },
                });
              }}
            >
              {'Add Question'}
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default MultipleChoice;
