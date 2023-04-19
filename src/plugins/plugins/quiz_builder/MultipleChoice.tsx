import * as React from 'react';

import Viewer from 'src/plugins/components/Viewer';
import Question from './Question';
import OptionControl from './OptionControl';
import QuizType from './QuizType';

const MultipleChoice = () => {
  const [options, setOptions] = React.useState<{ key: string; val: string }[]>(
    []
  );
  /*
   * Should display

   * The question header or title
   * A very easy to add options and remove options
   */

  return (
    <div className="h-full flex overflow-y-auto">
      <div className="flex-1 mx-4 ">
        <div className="my-2">
          <QuizType />
        </div>
        <Question />
        <div className="border border-darkpen-light dark:border-lightpen-light my-2" />
        <OptionControl options={options} setOptions={setOptions} />
      </div>
      <div className="flex-1">
        <Viewer
          mode={'read'}
          text={options.reduce((acc, op) => {
            return acc + op.val + '\n';
          }, '')}
        />
      </div>
    </div>
  );
};

export default MultipleChoice;
