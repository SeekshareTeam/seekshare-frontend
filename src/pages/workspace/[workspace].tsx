import * as React from 'react';

/* State Management */
import {
  serverFetchSubspaces,
  serverFetchWorkspace,
} from 'src/modules/Workspace/slice';
import { ssrFetchSubspaces, ssrFetchWorkspace } from 'src/generated/page';
import { wrapper, fetchSSRQuery, useAppSelector } from 'src/modules/Redux';

/* Components */
import { PageWithLayout } from 'src/utils/types';
import { UnderlineTabs } from 'src/components/Tabs';
import WorkspaceHeader from 'src/sections/workspace/Header';
import SubspaceRow from 'src/sections/workspace/SubspaceRow';

interface WorkspaceLayoutProps {
  underlineTabs: React.ReactNode;

  workspaceHeader: React.ReactNode;

  subspaceRow: React.ReactNode;
}

const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = (props) => {
  return (
    <div className="flex flex-col">
      {props.workspaceHeader}
      {props.underlineTabs}
      <div className="flex flex-col items-center justify-center">{props.subspaceRow}</div>
    </div>
  );
};

interface WorkspaceProps {
  workspaceId: string;
}

const Workspace: PageWithLayout<WorkspaceProps> = () => {
  const [selectedTab, setSelectedTab] = React.useState('subspaces');

  const [tabs] = React.useState([
    { tabValue: 'Subspaces', tabKey: 'subspaces' },
    { tabValue: 'Posts', tabKey: 'posts' },
    { tabValue: 'Q + A', tabKey: 'q_+_a' },
    { tabValue: 'Question Bank', tabKey: 'quizzes' },
    { tabValue: 'Settings', tabKey: 'settings' },
  ]);


  // Ensure that this is the current workspace and subspace that is being served
  const reduxState = useAppSelector(
    (state) => ({
      subspaces: state?.workspace?.server?.subspaces,
      workspace: state?.workspace?.server?.workspace || {
        name: 'Home',
        id: '1',
      },
      loading: state.app.loading,
    })
  );

  const onTabClick = (tabKey: string) => {
    setSelectedTab(tabKey);
  };

  return (
    <WorkspaceLayout
      workspaceHeader={
        <WorkspaceHeader
          loading={reduxState.loading}
          workspace={reduxState.workspace}
        />
      }
      underlineTabs={
        <UnderlineTabs
          tabs={tabs}
          onSelectTab={onTabClick}
          active={selectedTab}
        />
      }
      subspaceRow={reduxState?.subspaces?.map((subspace, i) => (
        <SubspaceRow
          key={i}
          logoAvatarProps={{ rounded: true, height: 100, width: 100 }}
          subspace={subspace}
        />
      ))}
    />
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: true, //indicates the type of fallback
  };
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

    await fetchSSRQuery({
      action: serverFetchSubspaces,
      ssrApolloQuery: ssrFetchSubspaces.getServerPage,
      variables: {
        workspaceId: workspace || '',
        pageNumber: 0,
      },
      dispatch: store.dispatch,
    });

    return {
      props: { workspaceId: context?.params?.workspace },
    };
  }
);

Workspace.layoutType = 'general';

export default Workspace;
