import * as React from 'react';
import { Formik, Field, Form } from 'formik';
import { GhostButton } from 'src/components/Button';

import { useApi, ApiContextInterface } from 'src/api/context';

export const SubspaceForm = () => {
  /*
     Validate if the workspace name is taken. think or take this into account.
   */
  // const [workspaceApi, _] = React.useState<WorkspaceApiResultType>(
  //   useWorkspaceApi()
  // );
  // const workspaceApi = useApi('workspace');
  // const subspaceApi = useApi('subspace');

  // React.useEffect(() => {
  //   setWorkspaceApi(useWorkspaceApi());
  // }, []);

  // const newInputFormRow = ({
  //   labelHtmlFor,
  //   labelName,
  //   inputValue,
  //   handleChange,
  //   handleBlur,
  // }) => {
  //   return (
  //     <div className="flex flex-row py-2 items-center justify-between">
  //       <label
  //         className="font-medium capitalize bold text-gray-700"
  //         htmlFor={labelHtmlFor}
  //       >
  //         {labelName}
  //       </label>
  //       <input
  //         type="text"
  //         name={labelHtmlFor}
  //         onChange={handleChange}
  //         onBlur={handleBlur}
  //         value={inputValue[labelHtmlFor]}
  //         className="rounded-lg shadow-md blur-sm border border-blue-400 outline-none focus:ring-2 w-1/2 focus:ring-blue-600 focus:ring-opacity-20 p-1"
  //       />
  //     </div>
  //   );
  // };

  // const newRadioFormRow = () => {};

  // const newInputRadio = ({ name, id, value, labelName, childDescription }) => {
  //   return (
  //     <div>
  //       <input type="radio" name={name} id={id} value={value} />
  //       <label className="px-2 text-gray-700" htmlFor={id}>
  //         {labelName}
  //       </label>
  //       <div className="text-gray-500 text-xs font-medium">
  //         {childDescription}
  //       </div>
  //     </div>
  //   );
  // };
  const [numOfSubspace, setNumOfSubspace] = React.useState([
    'Title',
    'Course',
    'Code',
  ]);

  return (
    <Formik
      initialValues={{
        subspaceNames: [],
        description: '',
        fNumOfSubspaces: 1,
        readability: 'public',
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
        return (
          <Form className="z-10 w-1/4 bg-white rounded-xl">
            <div className="z-10 w-1/2 w-full bg-white rounded-xl flex flex-wrap flex-col">
              <div className="bg-gray-50 py-2 flex rounded-t-xl w-full justify-center">
                <h1 className="font-light text-gray-700 text-4xl">
                  {'Add Subspace'}
                </h1>
              </div>
              <div className="px-10">
                {numOfSubspace.map((spaceName, ix) => {
                  return (
                    <div className="flex flex-col items-start">
                      <label
                        className="font-medium capitalize text-gray-700"
                        htmlFor={`subspace.${ix}`}
                      >
                        {spaceName}
                      </label>
                      <input
                        name={`subspace.${ix}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.subspaceNames[ix]}
                        className="rounded w-64 shadow-md blur-sm border focus:border-blue-400 outline-none focus:ring-1 focus:ring-blue-600 focus:ring-opacity-20 p-1"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="w-full flex justify-end p-4">
              <GhostButton textColor={'gray'} fillColor='gray' type="submit">
                {isSubmitting ? 'Please wait...' : 'Submit'}
              </GhostButton>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
