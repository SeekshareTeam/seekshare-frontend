import * as React from 'react';

/* State Management & APIs */
import { QuizOption } from 'src/utils/types';

import Question from './Question';
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

const useOptionResponses = () => {
  const [options, setOptions] = React.useState<
    QuizOption[]
  >([]);

  return { options, setOptions };
};

const MultipleChoice = () => {
  /*
   * Should display

   * The question header or title
   * A very easy to add options and remove options
   */
  const { active, setActive, responseTypes } = useResponseTypes();
  const { options, setOptions } = useOptionResponses();

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
      question={<Question />}
      optionControl={
        <OptionControl
          options={options}
          setOptions={setOptions}
          responseType={active}
        />
      }
      submitBox={
        <div className="h-full flex items-center">
          <div className="flex-1"> </div>
          <div className="flex-1 flex justify-end">
            <Button variant={'primary'} size={'large'} radius={'large'}>
              {'Add Question'}
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default MultipleChoice;
