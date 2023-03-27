import * as React from 'react';

/* State Management */
import { PermissionType, User as UserType } from 'src/generated/types';

/* Components */
import UserPermission from './UserPermission';

/* Types */
type GridItem = {
  cell1: React.ReactNode;
  cell2: React.ReactNode;
};

const UserPanelGridLayout: React.FC<{
  headers?: GridItem;
  gridData: GridItem[];
}> = ({ headers, gridData }) => {
  const data = [headers, ...gridData];

  return (
    <div className="grid grid-cols-4 gap-4 dark:text-darkpen-medium">
      {data.map((row) => {
        return (
          <>
            <div className="col-start-1 col-end-2">{row?.cell1}</div>
            <div className="col-start-3 col-end-5 col-span-2">{row?.cell2}</div>
          </>
        );
      })}
    </div>
  );
};

interface Props {
  accessRoles: PermissionType[];

  usersData: UserType[];
}

const Users: React.FC<Props> = (props) => {
  /**
   * Things to display:
   * User name and role
   */
  // const dummyUserData = [
  //   {
  //     firstname: 'Abhinav',
  //     lastname: 'Bhandari',
  //     email: 'abhinav@seekshare.com',
  //     userPermissions: 'read',
  //   },
  //   {
  //     firstname: 'Chris',
  //     lastname: 'Fortin',
  //     email: 'chris@seekshare.com',
  //     userPermissions: 'read_and_write',
  //   },
  // ];

  const headers = {
    cell1: <p className="font-semibold">{'Name'}</p>,
    cell2: <p className="font-semibold">{'Access Role'}</p>,
  };

  const renderCell1 = ({
    firstname,
    lastname,
    email,
  }: {
    firstname: string;
    lastname: string;
    email: string;
  }) => {
    return (
      <div className="flex flex-col">
        <p className="text-darkpen-medium">{firstname + ' ' + lastname}</p>
        <span className="text-darkpen-dark text-sm">{email}</span>
      </div>
    );
  };

  // const renderCell2 = ({ userPermissions }: { userPermissions: string }) => {
  //   return (
  //     <div className="flex items-center justify-end w-full">
  //       <ReusableDropdown
  //         optionList={props.accessRoles}
  //         position={'above'}
  //         horizontalPosition={'right'}
  //         bgColor={{
  //           dark: 'bg-night-dark',
  //           medium: 'bg-night-medium',
  //           light: 'bg-night-light',
  //         }}
  //         dropdownButton={(
  //           option: DropdownOptionType | null,
  //           dropdownRef: React.RefObject<HTMLButtonElement>
  //         ) => {
  //           return (
  //             <Button
  //               className="w-32 justify-between"
  //               type="button"
  //               variant={null}
  //               ref={dropdownRef}
  //             >
  //               {option ? option.text : ''}
  //             </Button>
  //           );
  //         }}
  //       />
  //       <span>{userPermissions}</span>
  //     </div>
  //   );
  // };

  const formatDataForGrid: GridItem[] = props.usersData.map((data) => {
    return {
      cell1: renderCell1({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      }),
      cell2: <UserPermission accessRoles={props.accessRoles} />,
    };
  });

  return <UserPanelGridLayout headers={headers} gridData={formatDataForGrid} />;
};

export default Users;
