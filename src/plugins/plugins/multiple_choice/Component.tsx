import React from 'react';

import Card from '../../plugins/components/Card';
import CardActionGroup from '../../plugins/components/CardActionGroup';
import Item from '../../plugins/components/Item';
import StyledText from '../../plugins/components/StyledText';
import SubmitButton from '../../plugins/components/SubmitButton';

import type { Editable, Saveable } from '../../utils/traits';
import type { Set } from '../../utils/types';

import { shuffleArray } from '../../utils/utilities';

import './styles.module.css';

export interface Props extends Editable, Saveable<number[]> {
  title: string;
  options: string[];
  answers: number[];
  randomize?: boolean;
}

const MultipleChoice: React.FC<Props> = props => {
  const [selected, setSelected] = React.useState<Set>({});
  const { mode } = props;

  const options = React.useMemo(() => {
    if (props.randomize) {
      return shuffleArray(props.options);
    }
    return props.options;
  }, [props.options.length, props.randomize]);

  return (
    <Card title="Multiple Choice">
      <StyledText className='mt-3' text={props.title} />
      <div className="mt-2 space-y-2">
        {options.map((option, i) => {
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
            <Item
              key={i}
              selected={mode === 'read' && selected[i] === 1}
              onClick={onClick}
            >
              {option}
            </Item>
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
              Object.keys(selected).map(x => parseInt(x, 10))
            );

            alert(
              `${right} / ${props.answers.length} correct and ${wrong} incorrect!`
            );
            setSelected({});
          };
          return (
            <CardActionGroup>
              <SubmitButton onClick={onClick} />
            </CardActionGroup>
          );
        })()}
    </Card>
  );
};

export default MultipleChoice;
