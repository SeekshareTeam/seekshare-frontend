import React from 'react';

import Card from '../../plugins/components/Card';
import StyledText from '../../plugins/components/StyledText';

import type { Editable, Saveable } from '../../utils/traits';

export interface Props extends Editable, Saveable<string> {
  title: string;
  answer?: string;
}

const OpenResponse: React.FC<Props> = props => {
  return (
    <Card title="Open Response">
      <StyledText text={props.title} />
      {props.mode === 'read' ? (
        <StyledText text={props.answer || 'No answer provided'} />
      ) : (
        <input value={props.answer} />
      )}
    </Card>
  );
};

export default OpenResponse;
