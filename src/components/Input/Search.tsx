import React from 'react';
import { Formik } from 'formik';
import { debounce } from 'lodash';
import * as yup from 'yup';

type Props = {
  validationSchema: ReturnType<ReturnType<typeof yup.object>['shape']>;

  labelName: string;

  labelTitle: React.ReactNode;

  searchQueryCallback?: (val: string) => Promise<void>;

  submissionCallback?: (val: string) => Promise<void>;

  onBlurCallback?: (e: React.FocusEvent<HTMLInputElement>) => void;

  onFocusCallback?: () => void;

  inputPlaceholder?: string;

  leftNode?: React.ReactNode;

  rightNode?: React.ReactNode;
};

const Search: React.FC<Props> = (props) => {
  const [boxFocus, setBoxFocus] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

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
    <div className="flex w-full">
      <Formik
        initialValues={{
          [props.labelName]: '',
        }}
        validationSchema={props.validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (props.submissionCallback) {
            await props.submissionCallback(values[props.labelName]);
          }
          setSubmitting(false);
        }}
      >
        {({ values, handleBlur, handleSubmit, setFieldValue }) => {
          return (
            <form className="flex-1" onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  className="font-medium capitalize bold text-gray-700 dark:text-white"
                  htmlFor={props.labelName}
                >
                  {props.labelTitle}
                </label>
              </div>
              <div
                onBlur={onLoseFocus}
                onClick={onContainerClick}
                className={`flex rounded shadow-md border border-blue-400 outline-none ${
                  boxFocus
                    ? 'ring-1 w-full ring-blue-600 ring-opacity-20 dark:ring-white'
                    : ''
                } p-1 dark:border-white dark:bg-night-light dark:caret-white dark:text-white`}
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
                    setFieldValue(props.labelName, targetValue);
                    if (props.searchQueryCallback) {
                      debounceCallback(targetValue);
                    }
                  }}
                  onBlur={handleBlur}
                  value={values[props.labelName]}
                  placeholder={props.inputPlaceholder || ''}
                  className="outline-none flex-1 dark:bg-night-light dark:caret-white"
                />
                {props.rightNode}
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Search;
