import * as React from 'react';
import { Select } from 'src/components/Button/TagButton';
import { SelectDropdownGrid } from 'src/components/Input/SelectDropdown';
import {
  useSearchTagsLazyQuery,
  useSearchExactTagLazyQuery,
} from 'src/generated/apollo';
import { SearchTagsQuery } from 'src/generated/operations';
import { isEmpty, debounce } from 'lodash';

type TagInputProps = {
  currentTags: { value: string; id: string }[];
  setCurrentTags: (val: { value: string; id: string }[]) => void;
};

// let debounceTimer;
//
// const debounce = (callback, wait) => {
//   return (...args) => {
//     clearTimeout(debounceTimer);
//     debounceTimer = setTimeout(() => {
//       callback(...args);
//     }, wait);
//   };
// };

export const TagInput: React.FC<TagInputProps> = (props) => {
  const [newTag, setNewTag] = React.useState('');
  const [boxFocus, setBoxFocus] = React.useState(false);
  const [tagResults, setTagResults] = React.useState<
    SearchTagsQuery['searchTags']
  >([]);
  const [searchTagsQuery, { data: dataSearchTags }] = useSearchTagsLazyQuery({
    fetchPolicy: 'network-only',
  });
  const [searchExactTagQuery, { data: dataExactTag }] =
    useSearchExactTagLazyQuery();

  const onSelectNewTag = React.useCallback(
    (selectedTag: { value: string; id: string }) => {
      props.setCurrentTags([...props.currentTags, selectedTag]);
      setTagResults([]);
      setNewTag('');
    },
    [props.currentTags]
  );

  React.useEffect(() => {
    if (dataExactTag) {
      if (dataExactTag.searchExactTag && newTag) {
        let selectedTag = { value: newTag, id: `no_id_${new Date().getTime()}` };
        selectedTag['value'] = dataExactTag.searchExactTag['value'];
        selectedTag['id'] = dataExactTag.searchExactTag?.id;

        onSelectNewTag(selectedTag);

      }
    }
  }, [dataExactTag, newTag]);

  React.useEffect(() => {
    if (dataSearchTags) {
      if (dataSearchTags.searchTags) {
        setTagResults(dataSearchTags.searchTags);
      }
    }
  }, [dataSearchTags]);

  const searchTagsQueryCallback = React.useCallback(
    debounce(async (val, onEnter = false) => {
      /*
         TODO: Write in a functionality that onEnter
         the debounce function should search for a tag
         that already exists based on the EXACT value
         If it does exist, then pass in the value from here.
       */
      if (onEnter) {
        // This should also be in the top section
        await searchExactTagQuery({
          variables: { queryString: val },
        });
        // let selectedTag = { value: val, id: `no_id_${new Date().getTime()}` };
        // if (exactTag?.data?.searchExactTag) {
        //   selectedTag['value'] = exactTag?.data?.searchExactTag['value'];
        //   selectedTag['id'] = exactTag?.data?.searchExactTag?.id;
        // }

        // onSelectNewTag(selectedTag);
      } else {
        await searchTagsQuery({
          variables: { queryString: val },
        });
      }
    }, 1000),
    [onSelectNewTag]
  );

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onContainerClick = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log(e);
    inputRef?.current?.focus();
    setBoxFocus(true);
  };

  const onLoseFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log(e);
    inputRef?.current?.blur();
    setBoxFocus(false);
  };

  const removeTagClick = (id: string) => {
    const filteredTags = props.currentTags.filter((ct) => {
      return ct.id !== id;
    });
    props.setCurrentTags([...filteredTags]);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (
      event.key === 'Enter' &&
      (event.target as HTMLInputElement).value.trim() !== ''
    ) {
      searchTagsQueryCallback((event.target as HTMLInputElement).value, true);
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.target.value);
    searchTagsQueryCallback(event.target.value);
  };

  return (
    <div className={'w-full relative'}>
      <div
        tabIndex={1}
        onBlur={onLoseFocus}
        className={`flex flex-row items-center w-full px-1 h-12 rounded border-2 ${
          boxFocus
            ? 'ring-1 ring-blue-600 ring-opacity-20 border-blue-300'
            : 'border-gray-200'
        }`}
        onClick={onContainerClick}
      >
        {props.currentTags.map((ct) => {
          return (
            <div className={'flex flex-row mr-1'} key={ct.id}>
              <Select value={ct.value} id={ct.id} onClick={removeTagClick} />
            </div>
          );
        })}
        <input
          type="text"
          value={newTag}
          onKeyDown={handleKeyDown}
          onChange={onInputChange}
          ref={inputRef}
          className={'outline-none flex-1'}
        />
      </div>
      {!isEmpty(tagResults) && (
        <SelectDropdownGrid items={tagResults} onSelectTag={onSelectNewTag} />
      )}
    </div>
  );
};
