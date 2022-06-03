import * as React from 'react';
import SidebarSection from 'src/sections/sidebar/Sections';
import TitleHeader from 'src/sections/sidebar/TitleHeader';
import { SearchSubspace } from 'src/components/Subspace/Search';
import { IconHash, IconBox } from '@tabler/icons';
import { useAppSelector } from 'src/modules/Redux';

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
}

const SidebarLayout: React.FC<SidebarLayoutProps> = (props) => {
  return (
    <aside
      className={`transition-all duration-500 sticky z-20 top-0 flex flex-shrink-0 flex-col ${
        props.sidebarToggle ? 'md:w-64' : 'md:w-64 md:-ml-64 md:flex-0'
      } h-screen px-2 py-4 bg-pink-900 overflow-y-hidden hover:overflow-y-auto text-gray-300 shadow-md border-r border-pink-300`}
    >
      {props.titleHeader}
      {props.searchSubspace}
      <div className="flex-1 px-3 py-3">
        {props.tabSections}
      </div>
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
    currentWorkspace: state?.auth?.data?.currentWorkspace,
    userSubspaces: state?.auth?.data?.userWorkspaces?.find((uw) => {
      // undefined should actually be the current workspace id
      if (state?.auth?.data?.currentWorkspace) {
        return uw.id === state.auth.data.currentWorkspace;
      }
      return false;
    })?.userSubspaces,
  }));

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
    <>
      <SidebarLayout
        titleHeader={<TitleHeader  />}
        sidebarToggle={props.sidebarToggle}
        searchSubspace={<SearchSubspace />}
        tabSections={sections.map((sec, labelIndex) => {
          return (
            <SidebarSection labelIndex={labelIndex} sectionElement={sec} />
          );
        })}
      />
    </>
  );
};

export default Sidebar;
