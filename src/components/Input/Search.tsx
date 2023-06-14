import React from 'react';
import { debounce } from 'lodash';
import * as yup from 'yup';

type Props = {
  validationSchema?: ReturnType<ReturnType<typeof yup.object>['shape']>;

  labelName: string;

  labelTitle: React.ReactNode;

  searchQueryCallback?: (val: string) => Promise<void>;

  submissionCallback?: (val: string) => Promise<void>;

  onBlurCallback?: (e: React.FocusEvent<HTMLInputElement>) => void;

  onFocusCallback?: () => void;

  inputPlaceholder?: string;

  leftNode?: React.ReactNode;

  rightNode?: React.ReactNode;

  className?: string;
};

const Search: React.FC<Props> = (props) => {
  const [boxFocus, setBoxFocus] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = React.useState<string>('');

  const onContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLButtonElement)) {
      inputRef?.current?.focus();
    }
    setBoxFocus(true);
    if (props.onFocusCallback) {
      props.onFocusCallback();
    }
  };

  const onLoseFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    inputRef?.current?.blur();
    setBoxFocus(false);
    if (props.onBlurCallback) {
      props.onBlurCallback(e);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (
      event.key === 'Enter' &&
      (event.target as HTMLInputElement).value.trim() !== ''
    ) {
      if (props?.searchQueryCallback) {
        props.searchQueryCallback((event.target as HTMLInputElement).value);
      }
    }
  };

  const debounceCallback = React.useCallback(
    debounce(async (val: string) => {
      if (props.searchQueryCallback) {
        await props.searchQueryCallback(val);
      }
    }, 500),
    [props.searchQueryCallback]
  );

  return (
    <div className={props.className}>
      <div className="mb-2">
        <label
          className="font-medium capitalize bold text-nord-0 dark:text-nord-6"
          htmlFor={props.labelName}
        >
          {props.labelTitle}
        </label>
      </div>
      <div
        onBlur={onLoseFocus}
        onClick={onContainerClick}
        className={`flex rounded-full border dark:border-nord-1 px-2 py-2  outline-none ${
          boxFocus
            ? 'ring-1 w-full ring-blue-600 ring-opacity-20 dark:ring-white'
            : ''
        } bg-nord-4 dark:bg-nord-0 caret-nord-0 dark:caret-nord-4 text-nord-0 dark:text-nord-6`}
      >
        {props.leftNode}
        <input
          ref={inputRef}
          type="text"
          name={props.labelName}
          autoComplete="off"
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            const targetValue = e?.target?.value || '';
            setSearchText(targetValue);
            if (props.searchQueryCallback) {
              debounceCallback(targetValue);
            }
          }}
          value={searchText}
          placeholder={props.inputPlaceholder || ''}
          className="outline-none flex-1 bg-nord-4 dark:bg-nord-0 caret-nord-0 dark:caret-nord-4"
        />
        {props.rightNode}
      </div>
    </div>
  );
};

export default Search;
