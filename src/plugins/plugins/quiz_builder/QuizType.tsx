import * as React from 'react';

import Dropdown, { DropdownOption } from 'src/components/Dropdown';
import { IconChevronDown } from '@tabler/icons';

interface Props {
  optionList: DropdownOption[];

  option: DropdownOption;

  onOptionClick: (option: DropdownOption) => void;
}

const QuizType: React.FC<Props> = (props) => {

  const dropdownRef = React.useRef(null);

  return (
    <Dropdown
      position={'above'}
      horizontalPosition={'left'}
      optionList={props.optionList}
      dropdownRef={dropdownRef}
      bgColor={{
        dark: 'dark:bg-night-dark',
        medium: 'dark:bg-night-medium',
        light: 'dark:bg-night-light hover:dark:brightness-105',
      }}
      onOptionClick={(option) => {
        props.onOptionClick(option)
      }}
      dropdownButton={
        <button
          className={
            'flex justify-between items-center rounded px-2 py-1 dark:bg-night-light hover:dark:brightness-105 shadow border dark:border-darkpen-dark dark:text-darkpen-medium w-40'
          }
          ref={dropdownRef}
        >
          {props.option.text}
          <IconChevronDown size={16} />
        </button>
      }
    />
  );
};

export default QuizType;
