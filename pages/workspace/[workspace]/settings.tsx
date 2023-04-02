import * as React from 'react';

/* State Management */
import { ssrFetchWorkspace } from 'src/generated/page';
import { PageWithLayout, SidebarTab } from 'src/utils/types';
import { wrapper, fetchSSRQuery } from 'src/modules/Redux';
import {
  serverFetchWorkspace,
} from 'src/modules/Workspace/slice';

/* Components */
import { IconSettings, IconUsers, IconAccessPoint } from '@tabler/icons';
import SettingControl from 'src/sections/settings/Control';
import SettingSidebar from 'src/sections/settings/Sidebar';


interface SettingsLayoutProps {
  settingSidebar: React.ReactNode;

  settingsControl: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = (props) => {
  return (
    <div className="flex flex-row flex-wrap h-full items-stretch">
      <div className="sm:w-full md:w-64">{props.settingSidebar}</div>
      <div className="flex-1">{props.settingsControl}</div>
    </div>
  );
};

const Settings: PageWithLayout<{}> = () => {
  /**
   * Have General Settings
   * Conditions for viewing this page:
   * The authenticated user, must be an owner of this workspace
   * workspace: { }
   */
  const [tabs] = React.useState<SidebarTab[]>([
    {
      tabValue: 'General',
      tabKey: 'general',
      icon: <IconSettings className="text-xs" />,
    },
    {
      tabValue: 'Access Level',
      tabKey: 'access_level',
      icon: <IconAccessPoint className="text-xs" />,
    },
    {
      tabValue: 'Users',
      tabKey: 'users',
      icon: <IconUsers className="text-xs" />,
    },
    { tabValue: 'Subspaces', tabKey: 'subspaces' },
  ]);

  const [selectedTab, setSelectedTab] = React.useState<SidebarTab>({
    tabValue: 'General',
    tabKey: 'general',
  });

  return (
    <SettingsLayout
      settingSidebar={
        <SettingSidebar
          tabs={tabs}
          selected={selectedTab}
          onSelect={setSelectedTab}
        />
      }
      settingsControl={<SettingControl tab={selectedTab} />}
    />
  );
};

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const workspace = context?.params?.workspace;

    await fetchSSRQuery({
      action: serverFetchWorkspace,
      ssrApolloQuery: ssrFetchWorkspace.getServerPage,
      variables: {
        workspaceId: workspace,
      },
      dispatch: store.dispatch,
    });

    return {
      props: { workspaceId: context?.params?.workspace },
    };
  }
);

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: true, //indicates the type of fallback
  };
};


Settings.layoutType = 'general';

Settings.accessLevel = { 'page': 'admin', workspace: 'admin' };

export default Settings;
