import React from 'react';
import Sidebar from '../Sidebar';
const classes = {
  app: 'flex flex-row flex-wrap',
  sidebar: 'flex',
  area: 'flex flex-col flex-auto h-screen flex-wrap',
  header: 'border border-yellow-100 h-16 w-full',
  content: 'border border-red-100 flex-1 w-full',
};

const AppLayout = ({ sidebar, children }) => {
  return (
    <div className={classes.app}>
      <div className={classes.sidebar}>
        {sidebar}
      </div>
      <div className={classes.area}>
        <div className={classes.header}>
          {children}
        </div>
        <div className={classes.content}>

        </div>
      </div>
    </div>
  );
};

export const getLayout = (page) => (
  <AppLayout sidebar={<Sidebar />}>
    {page}
  </AppLayout>
);

export default AppLayout;
