import * as React from 'react';

interface Props {
  legend: string;

  legendBackground: string;

  button: React.ReactNode;
}

const LabeledButton: React.FC<Props> = (props) => {
  return (
    <div className="relative border border-darkpen-dark rounded-lg py-2 px-2 m-0.5">
      <p
        className={`absolute top-0 left-2 text-xs -translate-y-1/2 dark:text-darkpen-dark ${
          props.legendBackground ?? 'dark:bg-night-dark'
        } rounded-full`}
      >
        {props.legend}
      </p>
      {props.button}
    </div>
  );
};

export default LabeledButton;
