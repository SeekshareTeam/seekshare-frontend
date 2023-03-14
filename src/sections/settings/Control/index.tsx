import * as React from 'react';

/* State Management */
import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/modules/Redux';

/* Components */
import { SidebarTab as SidebarTabType } from 'src/utils/types';
import General from 'src/sections/settings/Control/General';
import AccessLevel from 'src/sections/settings/Control/AccessLevel';
import Users from 'src/sections/settings/Control/Users';

interface Props {
  tab: SidebarTabType;
}

const SettingControl: React.FC<Props> = (props) => {
  const reduxState = useAppSelector(
    (state) => ({
      workspace: state?.workspace?.server?.workspace || {
        name: 'Home',
        id: '1',
      },
      loading: state.app.loading || false,
    }),
    shallowEqual
  );

  const renderControl = (tab: SidebarTabType) => {
    switch (tab.tabKey) {
      case 'general':
        return (
          <General
            workspace={reduxState.workspace}
            loading={reduxState.loading}
          />
        );
      case 'access_level':
        return <AccessLevel />;
      case 'users':
        return <Users />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full m-2 box-content border-b border-lightpen-dark">
        <h2 className="dark:text-darkpen-medium text-2xl font-light">
          {props.tab.tabValue}
        </h2>
      </div>
      {renderControl(props.tab)}
    </div>
  );
};

export default SettingControl;
