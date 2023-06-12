import * as React from 'react';

interface Props {
  ix: number;
  type: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<Props> = (props) => {

  return (
    <div className="flex flex-col py-1 justify-between items-start">
      <label
        className="font-semibold text-sm capitalize text-nord-0 dark:text-nord-6"
        htmlFor={`subspace.${props.ix}`}
      >
        {props.type}
      </label>
      <input
        name={`subspace.${props.ix}`}
        onChange={(val) => {
          props.handleChange(val);
          // strHashFunction(val.target.value);
        }}
        onBlur={props.handleBlur}
        value={props.value}
        className="rounded md:w-full xs:flex-1 dark:bg-nord-3 shadow-md border focus:border-blue-400 outline-none focus:ring-1 focus:ring-blue-600 focus:ring-opacity-20 p-1"
      />
    </div>
  );
};

export default FormInput;
