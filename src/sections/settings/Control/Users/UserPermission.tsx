import * as React from 'react';

/* State Management */
import { PermissionType } from 'src/generated/types';

/* Components */
import {
  ReusableDropdown,
  DropdownOption as DropdownOptionType,
} from 'src/components/Dropdown';

import { Button } from 'src/components/Button';

interface Props {
  accessRoles: PermissionType[];
}

const UserPermission: React.FC<Props> = (props) => {
  // const [userPermission, setUserPermission] =
  //   React.useState<DropdownOptionType>(props.accessRoles[0]);

  return (
    <div className="flex items-center justify-start w-full">
      <ReusableDropdown
        optionList={props.accessRoles}
        position={'above'}
        horizontalPosition={'right'}
        bgColor={{
          dark: 'bg-nord-0',
          medium: 'bg-nord-1',
          light: 'bg-nord-2',
        }}
        dropdownButton={(
          option: DropdownOptionType | null,
          dropdownRef: React.RefObject<HTMLButtonElement>
        ) => {
          return (
            <Button
              className="w-32 justify-between"
              type="button"
              variant={null}
              ref={dropdownRef}
            >
              {option ? option.text : ''}
            </Button>
          );
        }}
      />
    </div>
  );
};

export default UserPermission;
