import * as React from 'react';
import axios from 'axios';
import SidebarSection from 'src/sections/sidebar/Sections';
import TitleHeader from 'src/sections/sidebar/TitleHeader';
import UserControl from 'src/sections/sidebar/UserControl';
import { SearchSubspace } from 'src/components/Subspace/Search';
import { IconHash, IconBox } from '@tabler/icons';
import { useAppSelector } from 'src/modules/Redux';
import { updateAvatar } from 'src/modules/Auth/slice';

type SidebarProps = {
  sidebarToggle: boolean;
};

export type SectionElement = {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: { href: string; label: string; icon: React.ReactNode }[];
};

interface SidebarLayoutProps {
  searchSubspace: React.ReactNode;

  tabSections: React.ReactNode;

  sidebarToggle: boolean;

  titleHeader: React.ReactNode;

  userControl: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = (props) => {
  return (
    <aside
      tabIndex={0}
      className={`transition-all z-10 duration-500 md:sticky fixed w-64 max-w-64 top-0 flex flex-shrink-0 flex-col md:w-64 ${
        props.sidebarToggle ? '-ml-64 md:ml-0' : 'ml-0 md:-ml-64 md:flex-0'
      } h-screen bg-primary-dark dark:bg-night-medium text-darkpen-medium border-r border-pink-300 dark:border-night-light`}
    >
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
      label: 'Station',
      icon: null,
      items: [
        {
          href: '#',
          label: 'Home',
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

  const onUploadAvatar = React.useCallback(
    async (uploadFile: File) => {
      const formData = new FormData();

      const path = 'user/' + reduxState?.userId + '/avatar';

      if (reduxState?.userId) {
        if (uploadFile) {
          formData.append('storage_path', path);
          formData.append('user_avatar', uploadFile);
          formData.append('id', reduxState.userId);

          const responseUrl = await axios({
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-type': 'multipart/form-data',
            },
            url: process.env.NEXT_PUBLIC_AVATAR_UPLOAD,
            data: formData,
          });

          updateAvatar(responseUrl);
        }
      } else {
        console.log('throw error that user needs to be logged in.');
      }
    },
    [reduxState.userId]
  );

  function guard(arg: unknown): arg is object {
    return arg !== undefined;
  }

  React.useEffect(() => {
    if (reduxState?.userSubspaces) {
      let mySubspaces = sections.find(
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

  return (
    <SidebarLayout
      titleHeader={<TitleHeader title={reduxState.currentWorkspace.name} />}
      sidebarToggle={props.sidebarToggle}
      searchSubspace={<SearchSubspace />}
      tabSections={sections.map((sec, labelIndex) => {
        return <SidebarSection labelIndex={labelIndex} sectionElement={sec} />;
      })}
      userControl={
        <UserControl
          name={'Abhinav Bhandari'}
          userId={reduxState.userId}
          onUploadImage={onUploadAvatar}
          avatarUrl={reduxState.avatarUrl || ''}
        />
      }
    />
  );
};

export default Sidebar;
