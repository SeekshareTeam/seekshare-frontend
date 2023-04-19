import * as React from 'react';

import Dropdown, { DropdownOption } from 'src/components/Dropdown';

interface Props {}

const QuizType: React.FC<Props> = () => {
  const optionList: DropdownOption[] = React.useMemo(() => {
    return [
      {
        text: 'Multiple Choice',
        type: 'multiple_choice',
        id: 'multiple_choice',
        href: '',
      },
      { text: 'Longform Text', type: 'longform', id: 'longform', href: '' },
    ];
  }, []);

  const [quizType, setQuizType] = React.useState<DropdownOption>(optionList[0]);
  const dropdownRef = React.useRef(null);

  return (
    <Dropdown
      position={'above'}
      horizontalPosition={'left'}
      optionList={optionList}
      dropdownRef={dropdownRef}
      bgColor={{
        dark: 'dark:bg-night-dark',
        medium: 'dark:bg-night-medium',
        light: 'dark:bg-night-light',
      }}
      onOptionClick={(option) => {
        setQuizType(option);
      }}
      dropdownButton={
        <button
          className={
            'rounded-lg border dark:border-darkpen-dark dark:text-darkpen-dark hover:dark:text-darkpen-medium'
          }
          ref={dropdownRef}
        >
          {quizType.text}
        </button>
      }
    />
  );
};

export default QuizType;
