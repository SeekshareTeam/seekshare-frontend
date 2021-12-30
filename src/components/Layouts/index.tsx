import * as React from 'react';

import Header from 'src/components/App/Navbar/';

import { signIn, signOut } from 'next-auth/react';

export const GeneralView: React.FC = (props) => {
  return (
    <div className="flex flex-row w-full flex-wrap h-full min-h-screen">
      <div className="flex h-16 flex-row justify-end w-full border-2 border-blue-400">
        {props.header}
      </div>
      {props.children}
    </div>
  );
};

export const GeneralLayout = (page: JSX.Element) => {
  console.log('re render of layout');
  return (
    <GeneralView
      header={
          <Header />
      }
    >
      {page}
    </GeneralView>
  );
};

// export function SiteLayout({ children }) {
//   return (
//     <div className="relative flex w-full h-full min-h-screen">
//       <Sidebar />
//
//       <div className="flex flex-1">{children}</div>
//     </div>
//   )
// }
