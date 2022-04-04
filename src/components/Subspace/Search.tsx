import * as React from 'react';
import { Modal } from 'src/components/Modal';
import { SearchForm } from 'src/components/Subspace/SearchForm';

export const SearchSubspace: React.FC = () => {
  const [showSearch, setShowSearch] = React.useState(false);

  const turnOffSearch = () => {
    setShowSearch(false);
  };

  return (
    <>
      <Modal
        show={showSearch}
        blurBackground={true}
        onPressBlur={turnOffSearch}
      >
        <SearchForm turnOffSearch={turnOffSearch} />
      </Modal>
      <button
        onClick={() => {
          setShowSearch(!showSearch);
        }}
        className={'m-0 p-0'}
      >
        {'Search Subspace'}
      </button>
    </>
  );
};
