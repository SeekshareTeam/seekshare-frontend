import * as React from 'react';

type SidebarProps = {
  sidebarToggle: boolean;
}

const Sidebar: React.FC = (props: SidebarProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);

  return (
    <>
      {false && (
        <button
          className="border-2 border-red-500"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          {'toggle'}
        </button>
      )}
      <aside
        className={`transition-all duration-500 sticky top-0 flex flex-shrink-0 flex-col ${
          props.sidebarToggle ? 'w-64' : 'w-64 -ml-64 flex-0'
        } h-screen px-2 py-4 space-y-2 bg-gray-800 overflow-y-hidden hover:overflow-y-auto text-gray-100`}
      >
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {'Toggle'}
        </button>
        <div>
          <span>{'Test Tab'} </span>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
