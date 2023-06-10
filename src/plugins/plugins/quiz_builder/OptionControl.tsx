import * as React from 'react';

/* State Management & APIs */
import { QuizOption } from 'src/utils/types';

/* Components */
import Option from './Option';
import { Button } from 'src/components/Button';
import { IconCheck } from '@tabler/icons';

interface AnswerNodeProps extends Pick<QuizOption, 'answerValue'> {
  responseType: string;

  onChange: (answerValue: string | boolean) => void;
}

// const useAnswerNodeValues = (responseType: string) => {
//   let defaultValue: boolean | number = -1;
//
//   if (responseType === 'single') {
//     defaultValue = false;
//   } else if (responseType === 'multiple') {
//     defaultValue = false;
//   } else if (responseType === 'sequential') {
//     defaultValue = -1;
//   }
//
//   const [answerValue, setAnswerValue] = React.useState(defaultValue);
//
//   return {
//     answerValue,
//     setAnswerValue,
//   };
// };

const AnswerNode: React.FC<AnswerNodeProps> = (props) => {
  // const { answerValue, setAnswerValue } = useAnswerNodeValues(
  //   props.responseType
  // );

  switch (props.responseType) {
    case 'single':
      return (
        <button
          onClick={() => {
            props.onChange(!props.answerValue);
          }}
          className={`${
            props.answerValue === true ? 'bg-green-700' : ''
          } dark:text-darkpen-medium hover:dark:bg-green-700 border border-green-700 p-0.5 rounded-full`}
        >
          <IconCheck size={16} />
        </button>
      );
    case 'multiple':
      return (
        <button
          onClick={() => {
            props.onChange(!props.answerValue);
          }}
          className={`${
            props.answerValue === true ? 'bg-green-700' : ''
          } dark:text-darkpen-medium hover:dark:bg-green-700 border border-green-700 p-0.5 rounded`}
        >
          <IconCheck size={16} />
        </button>
      );
    case 'sequential':
      return (
        <input
          className={
            'dark:text-darkpen-medium dark:bg-night-light rounded border border-green-700 w-10'
          }
          type={'number'}
          size={2}
          maxLength={2}
          value={
            typeof props.answerValue === 'string' &&
            typeof parseInt(props.answerValue) === 'number'
              ? props.answerValue
              : 0
          }
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        />
      );
    default:
      return null;
  }
};

interface Props {
  options: QuizOption[];

  responseType: string;

  setOptions: (options: QuizOption[]) => void;
}

const splitOptions = (optionList: QuizOption[], option: QuizOption) => {
  const optionIndex = optionList.findIndex((op) => op.key === option.key);
  const beforeList = optionList.slice(0, optionIndex);
  const afterList = optionList.slice(optionIndex + 1);

  return { optionIndex, beforeList, afterList };
};

const OptionControl: React.FC<Props> = (props) => {
  return (
    <div className="h-full overflow-y-auto">
      {props.options.map((option, ix) => {
        return (
          <Option
            key={option.key}
            value={option.val}
            className={
              'rounded-lg overflow-hidden block my-1 border border-darkpen-dark'
            }
            answerNode={
              <AnswerNode
                answerValue={option.answerValue}
                onChange={(answerValue: string | boolean) => {
                  const { beforeList, afterList } = splitOptions(
                    props.options,
                    option
                  );

                  let mutableBeforeList = beforeList;
                  let mutableAfterList = afterList;
                  let mutableAnswerValue = answerValue;

                  if (props.responseType === 'single') {
                    mutableBeforeList = mutableBeforeList.map((val) => {
                      return { ...val, answerValue: false };
                    });
                    mutableAfterList = mutableAfterList.map((val) => {
                      return { ...val, answerValue: false };
                    });
                  }

                  if (props.responseType === 'sequential') {
                    if (
                      typeof mutableAnswerValue === 'string' &&
                      typeof parseInt(mutableAnswerValue) === 'number'
                    ) {
                      if (
                        parseInt(mutableAnswerValue) < 1 ||
                        parseInt(mutableAnswerValue) > props.options.length
                      ) {
                        mutableAnswerValue = option.answerValue;
                      }
                    } else {
                      mutableAnswerValue = '-1';
                    }
                  }

                  props.setOptions([
                    ...mutableBeforeList,
                    {
                      key: option.key,
                      val: option.val,
                      answerValue: mutableAnswerValue,
                    },
                    ...mutableAfterList,
                  ]);
                }}
                responseType={props.responseType}
              />
            }
            title={`Option ${ix + 1}`}
            onChange={(newVal: string) => {
              const { beforeList, afterList } = splitOptions(
                props.options,
                option
              );

              props.setOptions([
                ...beforeList,
                {
                  key: option.key,
                  val: newVal,
                  answerValue: option.answerValue,
                },
                ...afterList,
              ]);
            }}
            onClose={() => {
              const optionIndex = props.options.findIndex(
                (op) => op.key === option.key
              );
              const beforeList = props.options.slice(0, optionIndex);
              const afterList = props.options.slice(optionIndex + 1);

              props.setOptions([...beforeList, ...afterList]);
            }}
          />
        );
      })}
      <div className="flex justify-end">
        <Button
          onClick={() => {
            const now = new Date();
            const newKey = `option_${now.getTime().toString()}`;
            props.setOptions([
              ...props.options,
              { key: newKey, val: '', answerValue: false },
            ]);
          }}
          variant={null}
          size={'medium'}
          radius={'small'}
          disabled={props.options.length > 4}
        >
          {'Add Option'}
        </Button>
      </div>
    </div>
  );
};

export default OptionControl;
