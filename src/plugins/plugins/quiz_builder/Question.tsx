import * as React from 'react';

import PortableEditor from 'src/plugins/components/PortableEditor';

export const useQuestionState: () => {
  question: string;
  setQuestion: (val: string) => void;
} = () => {
  const [question, setQuestion] = React.useState('');

  return { question, setQuestion };
};

interface Props {
  value: string;
  setValue: (val: string) => void;
}

const Question: React.FC<Props> = (props) => {
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      sideBySideFullscreen: false,
      minHeight: '50px',
      placeholder: 'Insert Content...',
    }),
    []
  );

  const onChange = React.useCallback((val: string) => {
    props.setValue(val);
  }, []);

  return (
    <div
      className={'rounded-lg border border-darkpen-dark overflow-hidden block'}
    >
      <div className="rounded-t-lg">
        <span className="mx-2 text-sm dark:text-darkpen-dark">
          {'Question 1.'}
        </span>
      </div>

      <PortableEditor
        options={options}
        value={props.value}
        onChange={onChange}
      />
    </div>
  );
};

export default Question;
