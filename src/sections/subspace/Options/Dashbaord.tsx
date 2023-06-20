import * as React from 'react';

/* Components */
import {
  ReusableDropdown,
  DropdownOption as DropdownOptionType,
} from 'src/components/Dropdown';
import { IconPlus } from '@tabler/icons';

const DashboardOptions: React.FC = () => {
  const [options] = React.useState([
    { id: 'worksheet', text: 'Publish Worksheet' },
    { id: 'create', text: 'Create Quiz' },
  ]);

  return (
    <ReusableDropdown
      position={'below'}
      horizontalPosition={'right'}
      optionList={options}
      bgColor={{
        dark: 'bg-nord-9 dark:hover:bg-nord-9',
        medium: 'bg-nord-9 dark:hover:bg-nord-9 ',
        light: 'bg-nord-9/75',
      }}
      dropdownButton={(
        _: DropdownOptionType | null,
        dropdownRef: React.RefObject<HTMLButtonElement>
      ) => {
        return (
          <button
            ref={dropdownRef}
            className="rounded-full shadow-xl dark:bg-nord-7/75 dark:hover:brightness-110 p-2"
          >
            <IconPlus size={24} />
          </button>
        );
      }}
      onOptionClick={() => {
        console.log('option click');
      }}
    />
  );
};

export default DashboardOptions;
