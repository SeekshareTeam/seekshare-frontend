import * as React from 'react';

interface Props {
  labelHtmlFor: string;
  labelName: string;
  ariaLabel: string;
  ariaRequirement: boolean;
  inputValue: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  containerClass?: string;
  inputWidth?: string;
  type?: string;
}

const FormInput: React.FC<Props> = (props) => {
  const displayClass = props.containerClass
    ? props.containerClass
    : 'flex flex-row py-2 items-center justify-between';
  return (
    <div className={displayClass}>
      <label
        className="font-medium text-sm capitalize bold text-nord-0 dark:text-nord-6"
        htmlFor={props.labelHtmlFor}
      >
        {props.labelName}
      </label>
      <input
        type={props.type || 'text'}
        name={props.labelHtmlFor}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        aria-label={props.ariaLabel}
        aria-required={props.ariaRequirement}
        value={props.inputValue[props.labelHtmlFor]}
        className={`rounded-lg text-nord-0 dark:text-nord-6 border border-blue-400 dark:border-nord-0 outline-none focus:ring-1 ${
          props.inputWidth ? props.inputWidth : 'w-1/2'
        } focus:ring-blue-600 focus:ring-opacity-20 p-1 dark:focus:ring-nord-1 dark:bg-nord-1`}
      />
    </div>
  );
};

export default FormInput;
