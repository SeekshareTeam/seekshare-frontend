import React from 'react';

import Card from '../../plugins/components/Card';
import CardActionGroup from '../../plugins/components/CardActionGroup';
import Item from '../../plugins/components/Item';
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
    <Card title="Poll">
      <StyledText text={props.title} />
      <div className="mt-2 space-y-2">
        {props.options.map((option, i) => {
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
              onClick={onClick}
              selected={mode === 'read' && selected[i] === 1}
            >
              {option}
            </Item>
          );
        })}
      </div>
      {mode === 'read' &&
        (() => {
          const onClick = () => {
            props.onSubmit?.(
              props.id || '',
              Object.keys(selected).map(x => parseInt(x, 10))
            );
            alert(`Response: ${Object.keys(selected)}`);
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

export default Poll;
