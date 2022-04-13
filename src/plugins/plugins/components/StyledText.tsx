import React from 'react';
import toHtml from '../../utils/processor';

type DivProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'dangerouslySetInnerHTML'
>;

interface Props extends DivProps {
  text: string;
}

const StyledText: React.FC<Props> = props => {
  return (
    <div {...props} dangerouslySetInnerHTML={{ __html: toHtml(props.text) }} />
  );
};

export default StyledText;
