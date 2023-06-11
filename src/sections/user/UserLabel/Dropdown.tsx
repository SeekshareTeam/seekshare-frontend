import * as React from 'react';

/* Components */
import { Modal } from 'src/components/Modal';
import UserLabel from 'src/components/User/UserLabel';
import UserSettings from 'src/sections/user/Settings/ProfileManager';
import Dropdown, {
  DropdownOption as DropdownOptionType,
} from 'src/components/Dropdown';

interface Props {
  name: string;

  imgUrl?: string;
}

const UserLabelDropdown: React.FC<Props> = (props) => {
  const [showSettings, setShowSettings] = React.useState(false);

  const dropdownRef = React.useRef<HTMLButtonElement>(null);
  const options: DropdownOptionType[] = [
    {
      text: 'Settings',
      type: 'settings',
      href: '',
      id: '',
      callback: () => {
        setShowSettings(true);
      },
    },
  ];

  return (
    <>
      <Modal
        blurBackground={true}
        show={showSettings}
        onPressBlur={() => {
          setShowSettings(false);
        }}
      >
        <UserSettings />
      </Modal>
      <Dropdown
        dropdownRef={dropdownRef}
        dropdownButton={
          <button ref={dropdownRef} className="flex bg-nord-4 hover:bg-nord-1 dark:bg-nord-1 dark:hover:bg-nord-5 items-center justify-center px-2 py-1 rounded-full">
            <UserLabel name={props.name} imgUrl={props.imgUrl} />
          </button>
        }
        bgColor={{
          dark: 'bg-nord-0',
          medium: 'bg-nord-1',
          light: 'bg-nord-2',
        }}
        optionList={options}
        position={'above'}
        horizontalPosition={'right'}
      />
    </>
  );
};

export default UserLabelDropdown;
