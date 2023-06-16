import * as React from 'react';
import * as ReactDOM from 'react-dom';

import SidebarSection from 'src/sections/sidebar/Sections';
import TitleHeader from 'src/sections/sidebar/TitleHeader';
// import { SearchSubspace } from 'src/components/Subspace/Search';
import { IconHash, IconBox, IconHome } from '@tabler/icons';
import { useAppSelector } from 'src/modules/Redux';

// User Avatar related features
// import axios from 'axios';
// import UserControl from 'src/sections/sidebar/UserControl';
// import { updateAvatar } from 'src/modules/Auth/slice';

type SidebarProps = {
  sidebarToggle: boolean;
  setSidebarToggle: (val: boolean) => void;
};

export type SectionElement = {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: { href: string; label: string; icon: React.ReactNode }[];
};

interface SidebarLayoutProps {
  sidebarToggle: boolean;

  onPressBlur: () => void;

  sidebar: React.ReactNode;
}

const ResponsiveSidebarLayout: React.FC<SidebarLayoutProps> = (props) => {
  const [container, setContainer] = React.useState<Element | null>(null);
  const [root, setRoot] = React.useState<HTMLElement | null>(null);
  const [sidebarToggle, setSidebarToggle] = React.useState(props.sidebarToggle);

  React.useEffect(() => {
    setRoot(document.getElementById('sidebar-root'));
    setContainer(document.createElement('div'));
  }, []);

  React.useEffect(() => {
    if (root && container) {
      root.appendChild(container);

      return () => {
        root.removeChild(container);
      };
    }
  }, [container, root]);

  React.useEffect(() => {
    setSidebarToggle(props.sidebarToggle);
  }, [props.sidebarToggle]);

  if (!sidebarToggle || !container) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className="transition-all duration-500 z-20 md:hidden fixed w-full h-screen top-0 left-0 flex-shrink-0 bg-nord-4 dark:bg-nord-1 bg-opacity-50"
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
          props.onPressBlur();
        }
      }}
    >
      {props.sidebar}
    </div>,
    container
  );
};

const SidebarLayout: React.FC<SidebarLayoutProps> = (props) => {
  // const [container, setContainer] = React.useState<Element>(null);

  return (
    <>
      <ResponsiveSidebarLayout
        sidebarToggle={props.sidebarToggle}
        sidebar={props.sidebar}
        onPressBlur={props.onPressBlur}
      />

      <div className="md:block hidden top-0">
        {props.sidebar}
      </div>
    </>
  );
};

interface SidebarAssembledProps {
  searchSubspace: React.ReactNode;

  tabSections: React.ReactNode;

  titleHeader: React.ReactNode;

  userControl: React.ReactNode;
}

const SidebarAssembled: React.FC<SidebarAssembledProps> = (props) => {
  return (
    <aside tabIndex={0} className={`flex flex-col w-64 max-w-64 flex-shrink-0 md:w-64 md:ml-0 ml-0 md:flex-0 h-screen bg-nord-4 dark:bg-nord-1 text-nord-0 dark:text-nord-6 `}>
      {props.titleHeader}
      {props.searchSubspace}
      <div className="flex-1 px-3 py-3">{props.tabSections}</div>
      {props.userControl}
    </aside>
  );
};

const Sidebar: React.FC<SidebarProps> = (props) => {
  const [sections, setSections] = React.useState<SectionElement[]>([
    {
      id: 'home',
      label: 'My Activity',
      icon: <IconHome size={24} />,
      items: [
        {
          href: '/user/dashboard',
          label: 'Dashboard',
          icon: null,
        },
      ],
    },
    {
      id: 'my_subspaces',
      label: 'My Subspaces',
      icon: <IconBox size={24} />,
      items: [
        {
          href: '#',
          label: 'Math',
          icon: <IconHash size={16} />,
        },
      ],
    },
  ]);

  const reduxState = useAppSelector((state) => ({
    userId: state?.auth?.data?.id,
    avatarUrl: state?.auth?.data?.avatar,
    userCurrentWorkspace: state?.auth?.data?.currentWorkspace,
    currentWorkspace: state?.workspace?.server?.workspace || {
      name: 'Home',
      id: '1',
    },
    userSubspaces: state?.auth?.data?.userWorkspaces?.find((uw) => {
      // undefined should actually be the current workspace id
      if (state?.auth?.data?.currentWorkspace) {
        return uw.id === state.auth.data.currentWorkspace;
      }
      return false;
    })?.userSubspaces,
  }));

  // const onUploadAvatar = React.useCallback(
  //   async (uploadFile: File) => {
  //     const formData = new FormData();

  //     const path = 'user/' + reduxState?.userId + '/avatar';

  //     if (reduxState?.userId) {
  //       if (uploadFile) {
  //         formData.append('storage_path', path);
  //         formData.append('user_avatar', uploadFile);
  //         formData.append('id', reduxState.userId);

  //         const responseUrl = await axios({
  //           method: 'post',
  //           headers: {
  //             Accept: 'application/json',
  //             'Content-type': 'multipart/form-data',
  //           },
  //           url: process.env.NEXT_PUBLIC_AVATAR_UPLOAD,
  //           data: formData,
  //         });

  //         updateAvatar(responseUrl);
  //       }
  //     } else {
  //     }
  //   },
  //   [reduxState.userId]
  // );

  function guard(arg: unknown): arg is object {
    return arg !== undefined;
  }

  React.useEffect(() => {
    if (reduxState?.userSubspaces) {
      const mySubspaces = sections.find(
        (sec) => sec.id === 'my_subspaces'
      ) as SectionElement;
      const newMySubspaces = reduxState.userSubspaces.map((uSubspace) => {
        return {
          href: `/workspace/${uSubspace.workspaceId}/${uSubspace.id}`,
          label: `${uSubspace.name}`,
          icon: <IconHash size={16} />,
        };
      });

      if (guard(mySubspaces)) {
        mySubspaces.items = newMySubspaces;
        setSections(
          sections.map((sec) =>
            sec.id === 'my_subspaces' ? { ...mySubspaces } : sec
          )
        );
      }
    }
  }, [reduxState?.userSubspaces]);

  if (!reduxState?.userId) {
    return null;
  }

  return (
    <SidebarLayout
      sidebarToggle={props.sidebarToggle}
      onPressBlur={() => {
        props.setSidebarToggle(false);
      }}
      sidebar={
        <SidebarAssembled
          titleHeader={
            <TitleHeader currentWorkspace={reduxState.currentWorkspace} />
          }
          searchSubspace={null}
          tabSections={sections.map((section, labelIndex) => {
            return (
              <SidebarSection
                key={section.id}
                labelIndex={labelIndex}
                sectionElement={section}
              />
            );
          })}
          userControl={null}
        />
      }
    />
  );
};

export default Sidebar;
