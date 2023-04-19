import * as React from 'react';

import Option from './Option';
import { Button } from 'src/components/Button';

interface Props {
  options: { key: string; val: string }[];

  setOptions: (options: { key: string; val: string }[]) => void;
}

const OptionControl: React.FC<Props> = (props) => {
  return (
    <div>
      {props.options.map((option, ix) => {
        return (
          <Option
            key={option.key}
            value={option.val}
            className={
              'rounded-lg overflow-hidden block my-1 border border-darkpen-dark'
            }
            title={`Option ${ix + 1}`}
            onChange={(newVal: string) => {
              const optionIndex = props.options.findIndex(
                (op) => op.key === option.key
              );
              const beforeList = props.options.slice(0, optionIndex);
              const afterList = props.options.slice(optionIndex + 1);

              props.setOptions([
                ...beforeList,
                { key: option.key, val: newVal },
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
            props.setOptions([...props.options, { key: newKey, val: '' }]);
          }}
          variant={'primary'}
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
