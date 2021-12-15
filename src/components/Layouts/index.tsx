import * as React from 'react'

export const GeneralView: React.FC = (props) => {
  return (
    <div className="flex flex-row w-full h-full min-h-screen justify-center">
      {props.children}
    </div>
  )
}

type GeneralLayoutType = {
  page: JSX.Element;
}

export const GeneralLayout = (page: GeneralLayoutType) => {
  return (
    <GeneralView>
      {page}
    </GeneralView>
  )
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
