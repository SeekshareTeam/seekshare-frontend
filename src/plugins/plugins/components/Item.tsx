import React from 'react';

interface Props {
  selected?: boolean;
  onClick?: React.HTMLAttributes<HTMLDivElement>['onClick'];
}

const styles = {
  container: 'py-1 px-2 w-full rounded bg-neutral-700',
  selected: '', // ' bg-teal-700',
  unselected: ' hover:bg-teal-700',
};

const Item: React.FC<Props> = props => {
  return (
    <div
      className={
        styles.container +
        (props.selected ? styles.selected : styles.unselected)
      }
      onClick={props.onClick}
      style={
        props.selected
          ? {
              boxShadow:
                'inset 0 0 4px #0f766e, inset 0 0 4px #0f766e, inset 0 0 4px #0f766e',
            }
          : {}
      }
    >
      {props.children}
    </div>
  );
};

export default Item;
