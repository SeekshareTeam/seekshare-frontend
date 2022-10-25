import * as React from 'react';
import LogoAvatar from 'src/components/Sidebar/LogoAvatar';
import AddWorkspace from 'src/components/Sidebar/AddWorkspace';
import { useAppSelector } from 'src/modules/Redux';
import { AuthCheck } from 'src/components/Modal/AuthCheck';
import { IconDotsDiagonal } from '@tabler/icons';

interface MiniSidebarLayoutProps {
  userWorkspaces: React.ReactNode;

  addWorkspace: React.ReactNode;

  exploreWorkspace: React.ReactNode;
}

/*
 * Todo: Add Search Workspace Functionality
 */

const MiniSidebarLayout: React.FC<MiniSidebarLayoutProps> = (props) => {
  return (
    <div className="h-screen z-10 sticky w-16 px-2 py-4 bg-primary-dark dark:bg-night-light flex flex-col flex-shrink-0 items-center top-0">
      {props.userWorkspaces}
      {props.addWorkspace}
      {props.exploreWorkspace}
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
      addWorkspace={
        <AuthCheck
          message={'Please Login to Seekshare to create a new workspace.'}
          className={'flex self-center w-full justify-end'}
        >
          <AddWorkspace />
        </AuthCheck>
      }
      exploreWorkspace={
        <button className="dark:text-darkpen-light hover:dark:bg-zinc-600 px-2 rounded-full my-1 w-12 h-12 flex justify-center items-center">
          <IconDotsDiagonal />
        </button>
      }
    />
  );
};

export default MiniSidebar;
