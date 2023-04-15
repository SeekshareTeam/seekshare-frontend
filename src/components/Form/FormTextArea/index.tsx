import * as React from 'react';

interface Props {
  containerClass?: string;
  labelHtmlFor: string;
  labelName: string;
  inputValue: { [field: string]: any };
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: any) => void;
  inputWidth?: string;
  rows?: number;
}

const FormTextArea: React.FC<Props> = (props) => {
  const displayClass = props.containerClass
    ? props.containerClass
    : 'flex flex-row py-2 items-center';
  const rowNumber = props?.rows || 4;

  return (
    <div className={displayClass}>
      <label
        className="font-medium capitalize bold text-gray-700 dark:text-gray-300"
        htmlFor={props.labelHtmlFor}
      >
        {props.labelName}
      </label>
      <textarea
        style={{ resize: 'none' }}
        name={props.labelHtmlFor}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.inputValue[props.labelHtmlFor]}
        rows={rowNumber}
        className={`rounded-lg shadow-md border border-blue-400 dark:border-gray-300 outline-none focus:ring-2 ${
          props.inputWidth ? props.inputWidth : 'w-1/2'
        } focus:ring-blue-600 focus:ring-opacity-20 p-1 dark:bg-night-light dark:focus:ring-gray-400`}
      />
    </div>
  );
};

export default FormTextArea;
