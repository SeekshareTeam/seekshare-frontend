import * as React from 'react'

export function GeneralView({ children }) {
  return (
    <div className="flex flex-row w-full h-full min-h-screen justify-center">
      {children}
    </div>
  )
}

export const GeneralLayout = (page) => {
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
