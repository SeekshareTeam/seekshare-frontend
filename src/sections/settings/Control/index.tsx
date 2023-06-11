import * as React from 'react';

/* Server Fetching */
import {
  useFetchSubspacesLazyQuery,
  useFetchUsersByWorkspaceLazyQuery,
} from 'src/generated/apollo';

/* State Management */
import { shallowEqual } from 'react-redux';
import { clientFetchSubspaces } from 'src/modules/Workspace/slice';
import { fetchUsersByWorkspace } from 'src/modules/Users/slice';
import { useAppSelector, useCustomQuery } from 'src/modules/Redux';

/* Components */
import { SidebarTab as SidebarTabType } from 'src/utils/types';
import General from 'src/sections/settings/Control/General';
import AccessLevel from 'src/sections/settings/Control/AccessLevel';
import Subspaces from 'src/sections/settings/Control/Subspace';
import Users from 'src/sections/settings/Control/Users';

interface Props {
  tab: SidebarTabType;
}

const SettingControl: React.FC<Props> = (props) => {
  const [loading, setLoading] = React.useState(true);

  const defaultAccessRoles = [
    { type: 'read', text: 'Read Only', id: 'read' },
    { type: 'read_and_write', text: 'Read and Write', id: 'read_and_write' },
    { type: 'owner', text: 'Owner', id: 'owner' },
  ];

  const fetchSubspaces = useCustomQuery<
    typeof clientFetchSubspaces,
    typeof useFetchSubspacesLazyQuery
  >(clientFetchSubspaces, useFetchSubspacesLazyQuery, undefined, false);

  const fetchUsers = useCustomQuery<
    typeof fetchUsersByWorkspace,
    typeof useFetchUsersByWorkspaceLazyQuery
  >(fetchUsersByWorkspace, useFetchUsersByWorkspaceLazyQuery, undefined, false);

  const reduxState = useAppSelector(
    (state) => ({
      workspace: state?.workspace?.server?.workspace,
      users: state?.multipleUsers?.client,
      subspaces: state?.workspace?.subspaces,
      loading: state.app.loading || false,
    }),
    shallowEqual
  );

  React.useEffect(() => {
    if (reduxState?.workspace?.id) {
      setLoading(true);
      (async (workspaceId: string) => {
        await fetchSubspaces({
          variables: {
            workspaceId: workspaceId,
            pageNumber: 0,
          },
        });
      })(reduxState.workspace.id);

      (async (workspaceId: string) => {
        await fetchUsers({
          variables: {
            workspaceId: workspaceId,
            page: 0,
            limit: 20,
          },
        });
      })(reduxState.workspace.id);

      setLoading(false);
    }
  }, [reduxState?.workspace?.id]);

  const renderControl = (tab: SidebarTabType) => {
    switch (tab.tabKey) {
      case 'general':
        return (
          <General
            workspace={reduxState.workspace}
            loading={loading || reduxState.loading}
          />
        );
      case 'access_level':
        return <AccessLevel />;
      case 'subspaces':
        return (
          <Subspaces
            subspaces={reduxState.subspaces}
            loading={loading || reduxState.loading}
          />
        );
      case 'users':
        return (
          <Users
            accessRoles={
              reduxState.workspace?.permissionTypes || defaultAccessRoles
            }
            usersData={reduxState?.users || []}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full m-2 box-content border-b border-nord-0">
        <h2 className="text-nord-0 dark:text-nord-6 text-2xl font-light">
          {props.tab.tabValue}
        </h2>
      </div>
      {renderControl(props.tab)}
    </div>
  );
};

export default SettingControl;
