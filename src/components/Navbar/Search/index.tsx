import * as React from 'react';
import { IconSearch } from '@tabler/icons';

interface Props {
  /*
   * The backend call to fetch search results
   */
  fetchSearchResults?: (value: string) => Promise<void>;
  /**
   *
   */
}

const Search: React.FC<Props> = () => {
  // const [searchText, setSearchText] = React.useState<string>('');

  return (
    <div>
      <IconSearch />
    </div>
  )
};

export default Search;
