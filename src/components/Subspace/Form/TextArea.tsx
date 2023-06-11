import * as React from 'react';

interface Props {
  ix: number;
  type: string;
  value: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: any) => void;
}

const FormTextArea: React.FC<Props> = (props) => {

    return (
      <div className="flex flex-col py-1 justify-between items-start">
        <label
          className="font-semibold text-sm capitalize text-nord-0 dark:text-nord-6"
          htmlFor={`subspace.${props.ix}`}
        >
          {props.type}
        </label>
        <textarea
          style={{ resize: 'none' }}
          name={`subspace.${props.ix}`}
          placeholder={'Optional'}
          onChange={props.handleChange}
          id={`subspace.${props.ix}`}
          onBlur={props.handleBlur}
          value={props.value}
          rows={4}
          className="rounded-lg shadow-md w-full border border-blue-400 dark:border-gray-300 outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 p-1 bg-nord-4 dark:bg-nord-1 dark:focus:ring-gray-400"
        />
      </div>
    );
};

export default FormTextArea;
