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
          <button ref={dropdownRef} className="flex hover:bg-night-light items-center justify-center px-2 py-1 rounded-full">
            <UserLabel name={props.name} imgUrl={props.imgUrl} />
          </button>
        }
        bgColor={{
          dark: 'bg-night-dark',
          medium: 'bg-night-medium',
          light: 'bg-night-light',
        }}
        optionList={options}
        position={'above'}
        horizontalPosition={'right'}
      />
    </>
  );
};

export default UserLabelDropdown;
