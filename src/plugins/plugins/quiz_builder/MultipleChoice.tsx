import * as React from 'react';

/* State Management & APIs */
import { QuizOption } from 'src/utils/types';

import Question from './Question';
import OptionControl from './OptionControl';
import { BaseTab } from 'src/components/Tabs';

interface LayoutProps {
  tabs: React.ReactNode;
  question: React.ReactNode;
  optionControl: React.ReactNode;
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
    </div>
  );
};

export const useResponseTypes = () => {
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

  responseTypes: { tabKey: string; tabValue: string }[];

  active: string;

  setActive: (val: string) => void;
}

const MultipleChoice: React.FC<Props> = (props) => {
  /*
   * Should display

   * The question header or title
   * A very easy to add options and remove options
   */

  return (
    <MultipleChoiceLayout
      tabs={
        <BaseTab
          tabs={props.responseTypes}
          active={props.active}
          onSelectTab={(tabKey: string) => {
            props.setActive(tabKey);
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
          responseType={props.active}
        />
      }
    />
  );
};

export default MultipleChoice;
