import * as React from 'react';

import { IconSettings } from '@tabler/icons';

import Dropdown from 'src/components/Dropdown';
import { Button } from 'src/components/Button';
import { UserAvatar } from 'src/components/Sidebar';

interface Props {
  /**
   * Name string
   */
  name: string;
  /**
   * User Id
   */
  userId?: string;
  /**
   * Url for the user avatar
   */
  avatarUrl?: string;


  onUploadImage: (uploadFile: File) => Promise<void>;
}

const UserControl: React.FC<Props> = (props) => {
  const dropdownRef = React.useRef(null);

  return (
    <section className="flex py-4 pr-2 pl-1 bg-nord-4 dark:bg-nord-1 text-nord-0 dark:text-nord-6 items-center w-full">
      <UserAvatar
        imgUrl={props.avatarUrl}
        onUploadImage={props.onUploadImage}
      />
      <span className="text-sm text-nord-0 dark:text-nord-6">{props.name}</span>
      <div className="flex flex-1 justify-end hover:text-nord-1 dark:hover:text-nord-5 cursor-pointer">
        <Dropdown
          dropdownRef={dropdownRef}
          dropdownButton={
            <Button variant={null} ref={dropdownRef}>
              <IconSettings />
            </Button>
          }
          position={'below'}
          horizontalPosition={'left'}
        />
      </div>
    </section>
  );
};

export default UserControl;
