import * as React from 'react';
import { generate, Pattern } from '@prescott/geo-pattern';

import { Formik, Field } from 'formik';
import { Button } from 'src/components/Button';
import Avatar from 'src/components/Avatar';
import { IconRotate } from '@tabler/icons';
import * as yup from 'yup';

import { useWorkspaceApi } from 'src/api/context';

export const WorkspaceForm = () => {
  const workspaceApi = useWorkspaceApi();

  const [workspaceNameGen, setWorkspaceNameGen] = React.useState('abhinav');
  const [bgImageUrl, setBgImageUrl] = React.useState<string>('');
  const [genPattern, setGenPattern] = React.useState<Pattern | undefined>(
    undefined
  );

  const initialValues = {
    workspaceName: '',
    description: '',
    readability: 'public',
  };

  React.useEffect(() => {
    (async () => {
      const pattern = await generate({ input: workspaceNameGen });
      setGenPattern(pattern);
    })();
  }, [workspaceNameGen]);

  React.useEffect(() => {
    if (genPattern?.toDataURL) {
      setBgImageUrl(genPattern.toDataURL());
    }
  }, [genPattern]);

  const avatarRef: React.MutableRefObject<{
    onChangeCanvas: () => void;
    toBlob: (fileName: string) => void;
  } | null> = React.useRef(null);

  const changeAvatarCallback = React.useCallback(() => {
    if (avatarRef.current) {
      avatarRef.current.onChangeCanvas();
    }
  }, [avatarRef.current]);

  const submitCallback = React.useCallback(
    async (
      values: typeof initialValues,
      { setSubmitting }: { setSubmitting: (val: boolean) => void }
    ) => {
      /*
       * Should save the images first and then create the
       * workspace id.
       */

      const createdWorkspace = await workspaceApi?.onCreateWorkspace({
        name: values.workspaceName,
        description: values.description,
        workspacePermission: values.readability,
        bgImageUrl,
      });

      if (createdWorkspace?.data?.createWorkspace?.id && avatarRef?.current) {
        await avatarRef.current.toBlob(
          createdWorkspace.data.createWorkspace.id
        );
      }

      setSubmitting(false);
    },
    [bgImageUrl]
  );

  const newInputFormRow = ({
    labelHtmlFor,
    labelName,
    inputValue,
    handleChange,
    handleBlur,
  }: {
    labelHtmlFor: string;
    labelName: string;
    inputValue: Record<string, string>,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  }) => {
    return (
      <div className="flex flex-row py-2 items-center justify-between">
        <label
          className="font-medium capitalize bold text-nord-0 dark:text-nord-6"
          htmlFor={labelHtmlFor}
        >
          {labelName}
        </label>
        <input
          type="text"
          name={labelHtmlFor}
          id={labelHtmlFor}
          onChange={handleChange}
          onBlur={handleBlur}
          value={inputValue[labelHtmlFor]}
          className="rounded-lg shadow-md border border-blue-400 dark:border-gray-300 outline-none focus:ring-2 w-1/2 focus:ring-blue-600 focus:ring-opacity-20 p-1 dark:focus:ring-gray-400 bg-nord-4 dark:bg-nord-1"
        />
      </div>
    );
  };

  const newTextareaFormRow = ({
    labelHtmlFor,
    labelName,
    inputValue,
    handleChange,
    handleBlur,
  }: {
    labelHtmlFor: string;
    labelName: string;
    inputValue: Record<string, string>;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  }) => {
    return (
      <div className="flex flex-row py-2 items-center justify-between">
        <label
          className="font-medium capitalize bold text-nord-0 dark:text-nord-6"
          htmlFor={labelHtmlFor}
        >
          {labelName}
        </label>
        <textarea
          style={{ resize: 'none' }}
          name={labelHtmlFor}
          onChange={handleChange}
          id={labelHtmlFor}
          onBlur={handleBlur}
          value={inputValue[labelHtmlFor]}
          rows={4}
          className="rounded-lg shadow-md border border-blue-400 dark:border-gray-300 outline-none focus:ring-2 w-1/2 focus:ring-blue-600 focus:ring-opacity-20 p-1 bg-nord-4 dark:bg-nord-1 dark:focus:ring-gray-400"
        />
      </div>
    );
  };

  const newInputRadio = ({
    name,
    id,
    value,
    labelName,
    childDescription,
    inputValue,
  }: {
    name: string;
    id: string;
    value: string;
    labelName: string;
    childDescription: string;
    inputValue: string;
  }) => {
    return (
      <div>
        <input
          type="radio"
          name={name}
          id={id}
          value={value}
          checked={value === inputValue}
        />
        <label className="px-2 text-nord-0 dark:text-nord-6" htmlFor={id}>
          {labelName}
        </label>
        <div className="text-nord-1 text-xs font-medium dark:text-nord-5">
          {childDescription}
        </div>
      </div>
    );
  };

  const workspaceValidationSchema = yup.object().shape({
    workspaceName: yup
      .string()
      .min(2, 'Too short')
      .max(50, 'Too Long!')
      .required('Required!'),
    description: yup.string(),
    readability: yup.string().required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={workspaceValidationSchema}
      onSubmit={submitCallback}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form
          onSubmit={handleSubmit}
          className="z-40 w-1/2 h-3/4 bg-nord-4 rounded-xl dark:bg-gray-800 dark:text-gray-300 overflow-y-scroll"
        >
          <h1
            className={
              'p-2 overflow-hidden w-full text-2xl text-nord-0 dark:text-nord-6 bg-nord-4 dark:bg-gray-700'
            }
          >
            {'Create A New Workspace.'}
          </h1>
          <div
            className="w-full md:h-56  mb-2 rounded shadow box-border"
            style={{ backgroundImage: `url("${bgImageUrl}")` }}
          />
          <div className="flex flex-col p-2 rounded-xl">
            {newInputFormRow({
              labelHtmlFor: 'workspaceName',
              labelName: 'Workspace Name',
              inputValue: values,
              handleChange: (val) => {
                handleChange(val);
                setWorkspaceNameGen(val?.target?.value || '');
              },
              handleBlur,
            })}

            {newTextareaFormRow({
              labelHtmlFor: 'description',
              labelName: 'Description',
              inputValue: values,
              handleChange,
              handleBlur,
            })}

            <div className="flex flex-row py-2 items-start justify-between">
              <label className="font-medium capitalize bold text-gray-700 w-1/2 dark:text-gray-300">
                {'Set Workspace Image'}
              </label>
              <div className="flex flex-col w-1/2">
                <div className="self-center">
                  <Avatar
                    type={'canvas'}
                    ref={avatarRef}
                    displayHeight={96}
                    displayWidth={96}
                  />
                </div>
                <div
                  className="self-center my-2 text-blue-400 cursor-pointer flex flex-row items-center hover:text-blue-300"
                  onClick={() => {
                    changeAvatarCallback();
                  }}
                >
                  <IconRotate size={18} className="mx-1" />
                  {'Re-select!'}
                </div>
              </div>
            </div>

            <div className="flex flex-row py-2 items-start justify-between">
              <label className="font-medium capitalize bold text-nord-0 w-1/2 dark:text-nord-6">
                {'Privacy'}
              </label>

              <div className="flex-col w-1/2">
                <Field component="div" name="readability">
                  {newInputRadio({
                    name: 'readability',
                    id: 'readabilityPublic',
                    value: 'public',
                    labelName: 'Public',
                    childDescription:
                      'This workspace willbe readable by any public users.',
                    inputValue: values.readability,
                  })}

                  {newInputRadio({
                    name: 'readability',
                    id: 'readabilityPrivate',
                    value: 'private',
                    labelName: 'Private',
                    childDescription:
                      'This workspace will only be readable by its members.',
                    inputValue: values.readability,
                  })}
                </Field>
              </div>
            </div>
            <Button variant="primary" type="submit">
              {isSubmitting ? 'Please wait...' : 'Submit'}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
