import * as React from 'react';

interface Props {
  colorOption?: string;

  onSelect: (val: string) => void;
}

const IconCircle: React.FC<Props> = (props) => {
  const iconCircleClass = `rounded-full p-3 m-0.5 ${props.colorOption}`;

  return (
    <button
      type={'button'}
      onClick={async () => {
        if (props.onSelect && props.colorOption) {
          await props.onSelect(props.colorOption);
        }
      }}
    >
      <div className={iconCircleClass} />
    </button>
  );
};

export default IconCircle;
