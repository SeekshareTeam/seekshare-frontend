import * as React from 'react';

interface Props {
  containerClass?: string;
  labelHtmlFor: string;
  labelName: string;
  inputValue: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
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
        className="font-medium capitalize bold text-nord-0 dark:text-nord-6"
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
        } focus:ring-blue-600 focus:ring-opacity-20 p-1 bg-nord-4 dark:bg-nord-1 dark:focus:ring-gray-400`}
      />
    </div>
  );
};

export default FormTextArea;
