import * as React from 'react';

interface Props {
  labelHtmlFor: string;
  labelName: string;
  ariaLabel: string;
  ariaRequirement: boolean;
  inputValue: { [field: string]: any };
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: any) => void;
  displayClass?: string;
  inputWidth?: string;
  type?: string;
}

const FormInput: React.FC<Props> = (props) => {
  const displayClass = props.displayClass
    ? props.displayClass
    : 'flex flex-row py-2 items-center justify-between';
  return (
    <div className={displayClass}>
      <label
        className="font-medium capitalize bold text-lightpen-medium dark:text-darkpen-medium"
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
        className={`rounded-lg shadow-md dark:text-darkpen-medium border border-blue-400 dark:border-gray-300 outline-none focus:ring-2 ${
          props.inputWidth ? props.inputWidth : 'w-1/2'
        } focus:ring-blue-600 focus:ring-opacity-20 p-1 dark:focus:ring-darkpen-extradark dark:bg-night-dark`}
      />
    </div>
  );
};

export default FormInput;
