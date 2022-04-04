import * as React from 'react';
import { Subspace as SubspaceType } from 'src/generated/types';
import { IconBook } from '@tabler/icons';
import Link from 'next/Link';

interface SearchResultProps<T extends SubspaceType> {
  results?: T[];
  onSelectSearch: () => void;
}

export const SearchResult: React.FC<SearchResultProps<SubspaceType>> = (
  props
) => {
  const [results, setResults] = React.useState<SubspaceType[]>([]);

  /*
   * TODO: Add a logo field to each subspace
   * When the respective logo is queried, we can index it from
   * Our library of logos we provide.
   */

  React.useEffect(() => {
    if (props.results) {
      setResults(props.results);
    }
  }, [props.results]);

  return (
    <ul>
      {results.map((result: SubspaceType) => (
        <li
          key={result.id}
          className={
            'bg-pink-800 rounded-md text-gray-100 m-2 hover:bg-pink-700'
          }
        >
          <Link href={`/workspace/${result.workspaceId}/${result.id}`}>
            <a
              onClick={() => {
                props.onSelectSearch();
              }}
              className={'p-2 flex flex-row'}
            >
              <IconBook className="mx-2" />
              {result.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
