import * as React from 'react';

export interface Props {
  name: string;
  value: string;
  id: string;
  childDescription?: string;
  inputValue: string;
  labelTitle: string;
}

const InputRadio: React.FC<Props> = (props) => {

  return (
      <div>
        <input
          type="radio"
          name={props.name}
          id={props.id}
          value={props.value}
          checked={props.value === props.inputValue}
          className="cursor-pointer"
          onChange={() => {}}
        />
        <label className="px-2 text-gray-700 dark:text-darkpen-medium cursor-pointer" htmlFor={props.id}>
          {props.labelTitle}
        </label>
        <div className="text-gray-500 text-xs font-medium dark:text-darkpen-dark">
          {props.childDescription}
        </div>
      </div>

  )
};

export default InputRadio;
