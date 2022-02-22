import * as React from 'react';
import { Formik, Field, Form } from 'formik';
import { PrimaryButton } from 'src/components/Button';

import { useApi, ApiContextInterface } from 'src/api/context';

export const WorkspaceForm = () => {
  /*
     Validate if the workspace name is taken. think or take this into account.
   */
  // const [workspaceApi, _] = React.useState<WorkspaceApiResultType>(
  //   useWorkspaceApi()
  // );
  const workspaceApi = useApi('workspace');

  // React.useEffect(() => {
  //   setWorkspaceApi(useWorkspaceApi());
  // }, []);

  const newInputFormRow = ({
    labelHtmlFor,
    labelName,
    inputValue,
    handleChange,
    handleBlur,
  }) => {
    return (
      <div className="flex flex-row py-2 items-center justify-between">
        <label
          className="font-medium capitalize bold text-gray-700"
          htmlFor={labelHtmlFor}
        >
          {labelName}
        </label>
        <input
          type="text"
          name={labelHtmlFor}
          onChange={handleChange}
          onBlur={handleBlur}
          value={inputValue[labelHtmlFor]}
          className="rounded-lg shadow-md blur-sm border border-blue-400 outline-none focus:ring-2 w-1/2 focus:ring-blue-600 focus:ring-opacity-20 p-1"
        />
      </div>
    );
  };

  const newRadioFormRow = () => {};

  const newInputRadio = ({ name, id, value, labelName, childDescription }) => {
    return (
      <div>
        <input type="radio" name={name} id={id} value={value} />
        <label className="px-2 text-gray-700" htmlFor={id}>
          {labelName}
        </label>
        <div className="text-gray-500 text-xs font-medium">
          {childDescription}
        </div>
      </div>
    );
  };

  return (
    <Formik
      initialValues={{
        workspaceName: '',
        description: '',
        readability: 'public',
      }}
      onSubmit={async (values, { setSubmitting }) => {
        console.log('@ values', values);
        await workspaceApi?.onCreateWorkspace({
          name: values.workspaceName,
          description: values.description,
          workspacePermission: values.readability,
        });
        setSubmitting(false);
      }}
    >
      {({
        values,
        error,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="z-10 w-1/2 bg-white rounded-xl"
        >
          <div className="flex flex-col p-2 rounded-xl">
            {newInputFormRow({
              labelHtmlFor: 'workspaceName',
              labelName: 'Workspace Name',
              inputValue: values,
              handleChange,
              handleBlur,
            })}

            {newInputFormRow({
              labelHtmlFor: 'description',
              labelName: 'Description',
              inputValue: values,
              handleChange,
              handleBlur,
            })}

            {/*<div className="flex flex-row py-2 items-center justify-between">
              <label
                className="font-medium capitalize bold text-gray-700"
                htmlFor="workspaceName"
              >
                {'Workspace Name'}
              </label>
              <input
                type="text"
                name="workspaceName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.workspaceName}
                className="rounded-lg shadow-xl blur-sm border border-blue-400 outline-none focus:ring-2 w-1/2 focus:ring-blue-600 focus:ring-opacity-50 p-1"
              />
              </div>*/}

            <div className="flex flex-row py-2 items-start justify-between">
              <label className="font-medium capitalize bold text-gray-700 w-1/2">
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
                  })}

                  {newInputRadio({
                    name: 'readability',
                    id: 'readabilityPrivate',
                    value: 'private',
                    labelName: 'Private',
                    childDescription:
                      'This workspace will only be readable by its members.',
                  })}
                </Field>
              </div>
            </div>
            <PrimaryButton type="submit">
              {isSubmitting ? 'Please wait...' : 'Submit'}
            </PrimaryButton>
          </div>
        </form>
      )}
    </Formik>
  );
};
