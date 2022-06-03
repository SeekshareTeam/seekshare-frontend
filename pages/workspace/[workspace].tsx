import * as React from 'react';
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
      <div className="flex justify-center">{props.subspaceRow}</div>
    </div>
  );
};

const Workspace: PageWithLayout<{}> = () => {
  const [selectedTab, setSelectedTab] = React.useState('subspaces');

  const [tabs] = React.useState([
    { tabValue: 'Subspaces', tabKey: 'subspaces' },
    { tabValue: 'Posts', tabKey: 'posts' },
    { tabValue: 'Q + A', tabKey: 'q_+_a' },
    { tabValue: 'Question Bank', tabKey: 'quizzes' },
  ]);

  const onTabClick = (tabKey: string) => {
    setSelectedTab(tabKey);
  };

  return (
    <WorkspaceLayout
      workspaceHeader={<WorkspaceHeader logoAvatarProps={{ height: 300, width: 300 }} />}
      underlineTabs={
        <UnderlineTabs
          tabs={tabs}
          onSelectTab={onTabClick}
          active={selectedTab}
        />
      }
      subspaceRow={
        <SubspaceRow
          logoAvatarProps={{ rounded: true, height: 100, width: 100 }}
        />
      }
    />
  );
};

export const getStaticProps = async (context) => {
  return {
    props: { workspaceId: context.params.workspace },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: true, //indicates the type of fallback
  };
};

Workspace.layoutType = 'general';

export default Workspace;
