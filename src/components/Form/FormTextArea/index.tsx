import * as React from 'react';

interface Props {
  labelHtmlFor: string;
  labelName: string;
  inputValue: { [field: string]: any };
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: any) => void;
}

const FormTextArea: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-row py-2 items-center justify-between">
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
        rows={4}
        className="rounded-lg shadow-md border border-blue-400 dark:border-gray-300 outline-none focus:ring-2 w-1/2 focus:ring-blue-600 focus:ring-opacity-20 p-1 dark:bg-night-dark dark:focus:ring-gray-400"
      />
    </div>
  );
};

export default FormTextArea;
