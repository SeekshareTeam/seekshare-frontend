import * as React from 'react';

interface Prop {
  colorOption?: string;

  onSelect: (val: string) => void;
}

const IconCircle: React.FC<Prop> = (props) => {

  const iconCircleClass = `rounded-full p-3 m-0.5 ${props.colorOption}`

    return (
      <button
        className={iconCircleClass}
        type={'button'}
        onClick={async () => {
          if (props.onSelect && props.colorOption) {
            await props.onSelect(props.colorOption);
          }
        }}
      />
    );

};

export default IconCircle;
