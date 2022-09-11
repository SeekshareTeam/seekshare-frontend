import React from 'react';
import { Formik } from 'formik';
import { debounce } from 'lodash';
import * as yup from 'yup';

type Props = {
  validationSchema: ReturnType<ReturnType<typeof yup.object>['shape']>;

  labelName: string;

  labelTitle: string;

  searchQueryCallback?: (val: string) => Promise<void>;

  submissionCallback?: (val: string) => Promise<void>;

  onBlurCallback?: () => void;

  onFocusCallback?: () => void;

  inputPlaceholder?: string;

  leftNode?: React.ReactNode;

  rightNode?: React.ReactNode;
};

const Search: React.FC<Props> = (props) => {
  const [boxFocus, setBoxFocus] = React.useState(false);
  // const [values, setValues] = React.useState<{ [string]: any }>({});
  const inputRef = React.useRef<HTMLInputElement>(null);

  // React.useEffect(() => {
  //   if (props.labelName) {
  //     setValues({ [props.labelName]: '' });
  //   }
  // }, [props.labelName]);

  const onContainerClick = () => {
    inputRef?.current?.focus();
    setBoxFocus(true);
    if (props.onFocusCallback) {
      props.onFocusCallback();
    }
  };

  const onLoseFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    inputRef?.current?.blur();
    setBoxFocus(false);
    if (props.onBlurCallback) {
      props.onBlurCallback();
    }
    if (e?.relatedTarget instanceof HTMLElement) {
      e.relatedTarget.click();
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
    <div>
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
            <form onSubmit={handleSubmit}>
              <div>
                <div className="mb-2">
                  <label
                    className="font-medium capitalize bold text-gray-700"
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
                      ? 'ring-2 w-full ring-blue-600 ring-opacity-20'
                      : ''
                  } p-1`}
                >
                  {props.leftNode}
                  <input
                    ref={inputRef}
                    type="text"
                    name={props.labelName}
                    autoComplete="off"
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
                    className="outline-none flex-1"
                  />
                  {props.rightNode}
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Search;
