import * as React from 'react';

import Viewer from 'src/plugins/components/Viewer';

interface Props {
  text: string;
}
const Question: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col flex-1 rounded">
      <Viewer mode={'read'} text={props.text} />
    </div>
  );
};

export default Question;
