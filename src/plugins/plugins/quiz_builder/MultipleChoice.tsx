import * as React from 'react';

/* State Management & APIs */
import { QuizOption } from 'src/utils/types';
import { useCreateQuizMutation } from 'src/generated/apollo';

import Question from './Question';
import OptionControl from './OptionControl';
import { BaseTab } from 'src/components/Tabs';
import { Button } from 'src/components/Button';
import { IconBoxMultiple } from '@tabler/icons';

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

  question: string;

  setQuestion: (val: string) => void;

  workspaceId?: string;

  subspaceId?: string;
}

const MultipleChoice: React.FC<Props> = (props) => {
  /*
   * Should display

   * The question header or title
   * A very easy to add options and remove options
   */
  const { active, setActive, responseTypes } = useResponseTypes();
  const [createQuizMutation] = useCreateQuizMutation();

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
      question={
        <Question value={props.question} setValue={props.setQuestion} />
      }
      optionControl={
        <OptionControl
          options={props.options}
          setOptions={props.setOptions}
          responseType={active}
        />
      }
      submitBox={
        <div className="h-full flex items-center">
          <div className="flex flex-1">
            <div className="flex items-center hover:opacity-75">
              <IconBoxMultiple className="text-nord-4" />
              <span className="text-xs mx-1">{0}</span>
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <Button
              variant={'primary'}
              size={'large'}
              radius={'large'}
              onClick={async () => {
                console.log('@@@ w and s', props.workspaceId, props.subspaceId);
                if (props.workspaceId && props.subspaceId) {
                  await createQuizMutation({
                    variables: {
                      quizInput: {
                        body: props.question,
                        type: active,
                        options: props.options.map((option) => ({
                          body: option.val,
                          isAnswer:
                            typeof option.answerValue === 'boolean'
                              ? option.answerValue
                              : true,
                        })),
                      },
                      workspaceId: props.workspaceId,
                      subspaceId: props.subspaceId,
                    },
                  });
                }
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
