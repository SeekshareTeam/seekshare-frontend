import * as React from 'react';
import { IconSearch } from '@tabler/icons';
import { useSearchSubspacesLazyQuery } from 'src/generated/apollo';
import { debounce } from 'lodash';
import { SearchResult } from 'src/components/Subspace/SearchResult';

interface SearchFormProps {
  turnOffSearch: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = (props) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [searchSubspaces, { data: searchSubspaceResults }] =
    useSearchSubspacesLazyQuery();

  const searchSubspacesCallback = React.useCallback(
    debounce(async (val: string) => {
      await searchSubspaces({
        variables: { searchInput: { search: val, pageNumber: 0 } },
      });
    }, 300),
    []
  );

  const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    await searchSubspacesCallback(event.target.value);
  };

  const handleKeyDown = async (event: React.KeyboardEvent) => {
    if (
      event.key === 'Enter' &&
      (event.target as HTMLInputElement).value.trim() !== ''
    ) {
      // await searchSubspacesRequest(
      //   (event.target as HTMLInputElement).value,
      // );
      event.preventDefault();
    }
  };

  return (
    <section
      className={
        'z-50 p-2 max-w-md w-64 lg:w-80 bg-pink-900 dark:bg-nord-1 rounded-xl shadow-md border-gray-900 text-nord-0 dark:text-nord-6'
      }
    >
      <form
        name="subspaceSearch"
        autoComplete="off"
        className="w-full"
        onSubmit={async (e) => {
          await searchSubspacesCallback(searchValue);
          e.preventDefault();
        }}
      >
        <div className="flex flex-wrap text-gray-400">
          <label htmlFor="searchBar" className={'text-gray-400 flex'}>
            <IconSearch size={36} />
          </label>
          <input
            id="searchBar"
            type="text"
            onKeyDown={handleKeyDown}
            onChange={onInputChange}
            value={searchValue}
            placeholder={'Search Subspaces'}
            className={
              'flex-1 outline-none bg-pink-900 bg-nord-4 dark:bg-nord-1 appearance-none p-1 mx-1'
            }
          />
        </div>
      </form>
      <SearchResult
        results={searchSubspaceResults?.searchSubspaces || []}
        onSelectSearch={props.turnOffSearch}
      />
    </section>
  );
};
