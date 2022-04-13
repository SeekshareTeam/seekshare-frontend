import React from 'react';

import StyledText from '../../plugins/components/StyledText';
import SubmitButton from '../../plugins/components/SubmitButton';

import type { Editable, Saveable } from '../../utils/traits';
import type { Set } from '../../utils/types';

import './styles.module.css';

export interface Props extends Editable, Saveable<number[]> {
  title: string;
  options: string[];
}

const Poll: React.FC<Props> = props => {
  const [selected, setSelected] = React.useState<Set>({});
  const { mode } = props;

  return (
    <div className="poll-container">
      <StyledText text={props.title} />
      <div className="poll-option-container">
        {props.options.map((option, i) => {
          const style: React.CSSProperties = {};
          if (mode === 'read' && selected[i]) {
            style.backgroundColor = 'red';
          }

          const onClick = () => {
            setSelected(prev => {
              if (prev[i]) {
                delete prev[i];
              } else {
                prev[i] = 1;
              }
              return { ...prev };
            });
          };

          return (
            <StyledText
              key={i}
              className={mode === 'read' ? 'poll-option-button' : ''}
              onClick={onClick}
              style={style}
              text={`${i + 1} ${option}`}
            />
          );
        })}
      </div>
      {mode === 'read' &&
        (() => {
          const onClick = () => {
            props.onSubmit?.(
              props.id || '',
              Object.keys(selected).map(x => parseInt(x, 10)),
            );
            alert(`Response: ${Object.keys(selected)}`);
            setSelected({});
          };
          return <SubmitButton onClick={onClick} />;
        })()}
    </div>
  );
};

export default Poll;
