import * as React from 'react';
import { IconBox } from '@tabler/icons';

const SearchWorkspace: React.FC = () => {
  return (
    <button
      onClick={() => {
        console.log('Search Workspace');
      }}
      className="w-12 h-12 overflow-hidden rounded mt-1 hover:opacity-50 hover:bg-pink-700"
    >
      <IconBox size={36} className="m-auto" />
    </button>
  );
};

export default SearchWorkspace;
