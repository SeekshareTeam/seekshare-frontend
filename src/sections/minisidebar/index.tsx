import * as React from 'react';
import LogoAvatar from 'src/components/Sidebar/LogoAvatar';
import AddWorkspace from 'src/components/Sidebar/AddWorkspace';
import { useAppSelector } from 'src/modules/Redux';

interface MiniSidebarLayoutProps {
  userWorkspaces: React.ReactNode;

  addWorkspace: React.ReactNode;
}

/*
 * Todo: Add Search Workspace Functionality
 */

const MiniSidebarLayout: React.FC<MiniSidebarLayoutProps> = (props) => {
  return (
    <div className="h-screen w-16 px-2 py-4 bg-pink-900 flex flex-col items-center">
      {props.userWorkspaces}
      {props.addWorkspace}
    </div>
  );
};

const MiniSidebar: React.FC = () => {
  const reduxState = useAppSelector((state) => ({
    currentWorkspace: state?.auth?.data?.currentWorkspace,
    userWorkspaces: state?.auth?.data?.userWorkspaces,
  }));

  return (
    <MiniSidebarLayout
      userWorkspaces={reduxState?.userWorkspaces?.map((w) => (
        <LogoAvatar imgUrl={w.url || ''} />
      ))}
      addWorkspace={<AddWorkspace />}
    />
  );
};

export default MiniSidebar;
