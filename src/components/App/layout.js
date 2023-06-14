import React from 'react';

const classes = {
  app: 'flex flex-row flex-wrap',
  sidebar: 'flex',
  wrapper: ''
};

const AppLayout = ({ sidebar }) => {
  return (
    <div className={classes.app}>
      <div className={classes.sidebar}>
        {sidebar}
      </div>
    </div>
  );
};

export default AppLayout;
