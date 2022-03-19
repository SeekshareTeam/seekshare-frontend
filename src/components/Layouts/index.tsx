import * as React from 'react';

import Navbar from 'src/components/App/Navbar/';
import Sidebar from 'src/components/App/Sidebar';

type GeneralViewProps = {
  sidebar: JSX.Element;
  header: JSX.Element;
}

export const GeneralView: React.FC<GeneralViewProps> = (props) => {
  return (
    <div className="flex flex-row w-full h-full min-h-screen flex-wrap">
      {props.sidebar}
      <div className="flex-col flex flex-1">
        <nav className="flex h-16 border-2 border-blue-400">{props.header}</nav>
        {props.children}
      </div>
    </div>
  );
};

export const GeneralLayout: React.FC = (props) => {
  const [sidebarToggle, setSidebarToggle] = React.useState(true);

  return (
    <GeneralView
      sidebar={<Sidebar sidebarToggle={sidebarToggle} />}
      header={<Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />}>
      {props.children}
      {/*<button onClick={() => setLol(pren => !pren)}>
        {'click me'}
      </button>*/}
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
