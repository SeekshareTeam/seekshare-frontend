import * as React from 'react';
import { Quiz as QuizType } from 'src/generated/types';

import Viewer from 'src/plugins/components/Viewer';

interface OptionProps {
  selectedAnswer: boolean;
  text: string;
  onClick: () => void;
  type: string;
}
const Option: React.FC<OptionProps> = (props) => {
  let checkMarkShape = 'rounded';

  if (props.type === 'single') {
    checkMarkShape = 'rounded-full';
  }

  return (
    <button
      className="w-full flex dark:hover:bg-nord-2 rounded-lg p-2"
      onClick={props.onClick}
    >
      <div
        className={`shrink-0 m-1 w-4 h-4 border ${checkMarkShape} ${
          props.selectedAnswer ? 'bg-green-700' : 'dark:bg-nord-1'
        }`}
      />
      <div className="flex justify-start flex-1">
        <Viewer text={props.text} mode={'read'} />
      </div>
    </button>
  );
};

interface MultipleChoiceInputProps {
  quiz: QuizType;

  onSelectAnswer?: (val: string | string[]) => void;

  selectedAnswer?: string | string[];
}

const MultipleChoiceInput: React.FC<MultipleChoiceInputProps> = (props) => {
  const [options, setOptions] = React.useState<string[]>([]);
  const [selectedOptionsKey, setSelectedOptionsKey] = React.useState<{
    [key: string]: boolean;
  }>({});

  React.useEffect(() => {
    if (props?.quiz?.optionKeys) {
      setOptions(props.quiz.optionKeys.map((option) => option.id));
    }
  }, [props?.quiz?.optionKeys]);

  return (
    <>
      {props.quiz.optionKeys?.map((option) => {
        return (
          <div className="w-full" key={option.id}>
            <Option
              onClick={() => {
                if (props.quiz.type === 'single') {
                  const newSelection: { [key: string]: boolean } = {};
                  options.forEach((op) => {
                    newSelection[op] = false;
                  });
                  newSelection[option.id] = true;

                  setSelectedOptionsKey(newSelection);
                  if (props.onSelectAnswer) {
                    props.onSelectAnswer(option.id);
                  }
                } else if (props.quiz.type === 'multiple') {
                  const newSelection: { [key: string]: boolean } = {
                    ...selectedOptionsKey,
                  };

                  newSelection[option.id] = !newSelection[option.id];

                  setSelectedOptionsKey(newSelection);
                  const selectedIds =
                    (Object.entries(newSelection)
                      .map(([key, val]): string | undefined => {
                        if (val) {
                          return key;
                        } else {
                          return undefined;
                        }
                      })
                      .filter((x) => x !== undefined) as string[]) || [];

                  if (props.onSelectAnswer) {
                    props.onSelectAnswer(selectedIds);
                  }
                }
              }}
              selectedAnswer={selectedOptionsKey[option.id] || false}
              text={option?.content?.body || ''}
              type={props.quiz.type}
            />
          </div>
        );
      })}
    </>
  );
};

export default MultipleChoiceInput;
