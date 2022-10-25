import * as React from 'react';
import { IconChevronDown, IconEdit } from '@tabler/icons';
import Dropdown from 'src/components/Dropdown';
import { Button } from 'src/components/Button';

interface TitleHeaderProps {
  title: string;
}

// const TitleDropdown: React.FC<TitleDropdownProps> = (props) => {
//   return (
//     <button className="w-full px-2 bg-none hover:brightness-200">
//     </button>
//   );
// };

const TitleHeader: React.FC<TitleHeaderProps> = (props) => {
  const dropdownRef = React.useRef(null);

  const options = [
    { text: 'Account Setting', href: '', id: '' },
    { text: 'Support', href: '', id: '' },
    { text: 'License', href: '', id: '' },
    { text: 'Sign Out', href: '', id: '' },
  ];

  return (
    <div className="relative inline-block m-auto dark:bg-night-light w-full py-4">
      <div className="flex justify-between items-center w-full px-4 bg-none">
        <div className="flex flex-1 items-center justify-start">
          <Dropdown
            dropdownRef={dropdownRef}
            dropdownButton={
              <Button variant={null} ref={dropdownRef}>
                  <h1 className="font-semibold text-lg">{props.title}</h1>
                  <IconChevronDown />
              </Button>
            }
            optionList={options}
            position={'above'}
            horizontalPosition={'left'}
          />
        </div>
        <Button variant={null}>
          <IconEdit />
        </Button>
      </div>
    </div>
  );
};

export default TitleHeader;
