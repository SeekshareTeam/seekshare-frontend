import * as React from 'react';

import Navbar from 'src/components/App/Navbar/';
import Sidebar from 'src/sections/sidebar';
import MiniSidebar from 'src/sections/minisidebar';

type GeneralViewProps = {
  minisidebar: JSX.Element;
  sidebar: JSX.Element;
  header: JSX.Element;
  children?: React.ReactNode;
};

export const GeneralView: React.FC<GeneralViewProps> = (props) => {
  return (
    <div className="flex flex-row w-full h-screen min-h-screen">
      {props.minisidebar}
      {props.sidebar}
      <div className="flex-col flex sticky flex-1 overflow-y-auto">
        <nav className="flex h-16">{props.header}</nav>
        {props.children}
      </div>
    </div>
  );
};

interface Props {
  children?: React.ReactNode;
}

export const GeneralLayout: React.FC<Props> = (props) => {
  const [sidebarToggle, setSidebarToggle] = React.useState(false);

  return (
    <GeneralView
      minisidebar={<MiniSidebar />}
      sidebar={
        <Sidebar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
      }
      header={
        <Navbar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
      }
    >
      {props.children}
    </GeneralView>
  );
};

export type GeneralLayoutType = typeof GeneralLayout;
// export function SiteLayout({ children }) {
//   return (
//     <div className="relative flex w-full h-full min-h-screen">
//       <Sidebar />
//
//       <div className="flex flex-1">{children}</div>
//     </div>
//   )
// }
