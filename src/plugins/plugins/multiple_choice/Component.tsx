import React from 'react';

import StyledText from '../../plugins/components/StyledText';
import SubmitButton from '../../plugins/components/SubmitButton';

import type { Editable, Saveable } from '../../utils/traits';
import type { Set } from '../../utils/types';

import './styles.module.css';

export interface Props extends Editable, Saveable<number[]> {
  title: string;
  options: string[];
  answers: number[];
}

const MultipleChoice: React.FC<Props> = props => {
  const [selected, setSelected] = React.useState<Set>({});
  const { mode } = props;

  return (
    <div className="mc-container">
      <StyledText text={props.title} />
      <div className="mc-option-container">
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
              className={mode === 'read' ? 'mc-option-button' : ''}
              onClick={onClick}
              style={style}
              text={`${String.fromCharCode((i % 26) + 97)}) ${option}`}
            />
          );
        })}
      </div>
      {mode === 'read' &&
        (() => {
          const onClick = () => {
            const answers = props.answers.reduce<Set>((acc, x) => {
              acc[x] = 1;
              return acc;
            }, {});

            let right = 0;
            let wrong = 0;
            Object.keys(selected).forEach(x => {
              if (answers[x]) {
                right += 1;
              } else {
                wrong += 1;
              }
            });

            props.onSubmit?.(
              props.id || '',
              Object.keys(selected).map(x => parseInt(x, 10)),
            );

            alert(
              `${right} / ${props.answers.length} correct and ${wrong} incorrect!`,
            );
            setSelected({});
          };
          return <SubmitButton onClick={onClick} />;
        })()}
    </div>
  );
};

export default MultipleChoice;
