import * as React from 'react';

import PortableEditor from 'src/plugins/components/PortableEditor';

const Question: React.FC = () => {
  const [value, setValue] = React.useState('');

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
    setValue(val);
  }, []);

  return (
    <div className={'rounded-lg border border-darkpen-dark overflow-hidden block'}>
      <div className="rounded-t-lg">
        <span className="mx-2 text-sm dark:text-darkpen-dark">
          {'Question 1.'}
        </span>
      </div>

      <PortableEditor
        options={options}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Question;
