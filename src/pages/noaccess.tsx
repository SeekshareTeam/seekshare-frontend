import * as React from 'react';

const NoAccess: React.FC = () => {
  return (
    <div className="flex w-full h-screen justify-center">
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl text-nord-0 dark:text-nord-6 font-bold">
          {'Error 404: You do not have access to this page!'}
        </h1>
      </div>
    </div>
  );
};

export default NoAccess;
