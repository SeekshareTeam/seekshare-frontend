import * as React from 'react';
import { SearchSubspace } from 'src/components/Subspace/Search';
import { SidebarTab } from 'src/components/App/Sidebar/NavigationLink';
import { IconHash, IconBox } from '@tabler/icons';
import { useAppSelector } from 'src/modules/Redux';

type SidebarProps = {
  sidebarToggle: boolean;
};

type SectionElement = {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: { href: string; label: string; icon: React.ReactNode }[];
};

const Sidebar: React.FC<SidebarProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
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
    userSubspaces: state?.auth?.data?.userWorkspaces?.find((uw) => {
      // undefined should actually be the current workspace id
      return uw.id === undefined;
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
      <aside
        className={`transition-all duration-500 sticky z-20 top-0 flex flex-shrink-0 flex-col ${
          props.sidebarToggle ? 'md:w-64' : 'md:w-64 md:-ml-64 md:flex-0'
        } h-screen px-2 py-4 bg-pink-900 overflow-y-hidden hover:overflow-y-auto text-gray-300 shadow-md border-r border-pink-300`}
      >
        <SearchSubspace />
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {'Toggle'}
        </button>
        <div className="flex-1 px-3 py-3">
          {sections.map((sec, labelIndex) => {
            return (
              <ul key={labelIndex}>
                <div className="flex items-center pt-5 pb-2">
                  <span>{sec.icon}</span>
                  <h4
                    key={labelIndex}
                    className="px-2 font-semibold text-gray-300 dark:text-white"
                  >
                    {sec.label}
                  </h4>
                </div>
                {sec?.items.map((it) => (
                  <SidebarTab key={it.label} {...it} />
                ))}
              </ul>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
