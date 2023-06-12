import * as React from 'react';
import * as yup from 'yup';

// import { DefaultColors } from 'tailwindcss/types/generated/colors';
// import { toast } from 'react-toastify'

import { Formik, Form, FormikHelpers } from 'formik';
import { Button } from 'src/components/Button';
import { useSubspaceApi } from 'src/api/context';
import { FormInput, FormTextArea, SubspaceIconPicker } from './Form';

interface SubspaceFormProps {
  workspaceId?: string;
  workspaceName?: string;
  onSubmit: () => void;
}

export const SubspaceForm: React.FC<SubspaceFormProps> = (props) => {
  /*
     Validate if the workspace name is taken. think or take this into account.
   */
  const subspaceApi = useSubspaceApi();

  // Todo: Create a subspace map that points to what each
  // Field is.
  const [numOfSubspace] = React.useState([
    'Title',
    'Course',
    'Code',
    'Description',
  ]);
  const [subspaceImgUrl, setSubspaceImgUrl] = React.useState<{
    type: 'color' | 'image';
    value: string;
  }>({ type: 'color', value: 'from-slate-500 to-zinc-500' });
  const [showIconPicker, setShowIconPicker] = React.useState(false);

  const initialValues = {
    subspaceFields: [],
    subspace: [...Array(numOfSubspace.length)].map(() => ''),
    description: '',
    fNumOfSubspaces: 1,
    readability: 'public',
  };

  // const strHashFunction = (subString: string) => {
  //   const colorHash =
  //     [...subString].reduce((acc, v) => acc + v.charCodeAt(0), 0) % 15;
  // };

  const headerComponent = () => {
    return (
      <div className="bg-gray-50 bg-nord-4 dark:bg-nord-1 py-4 px-6 flex flex-col rounded-t-xl w-full items-center justify-center">
        <h2 className="font-semibold text-nord-0 dark:text-nord-6 text-xl">
          {'Add Subspace'}
        </h2>
        <p className="text-nord-0 dark:text-nord-6 font-light text-xs">
          {
            'Subspaces are work stations that belong to a parent Workspace. In a subspace you can manage content, members, and permissions.'
          }
        </p>
      </div>
    );
  };

  const subspaceValidationSchema = yup.object().shape({
    subspace: yup
      .array()
      .compact(function (v) {
        return v === '';
      })
      .of(yup.string().min(1))
      .min(3)
      .test(
        'is-required',
        'Has to have first 3',
        (value: (string | undefined)[] | undefined) => {
          if (!value) {
            return false;
          }
          return value.slice(0, 3)?.every((v) => v && v?.length > 0);
        }
      ),
  });

  // const iconPicker = () => {
  //   return (
  //     <div className="flex flex-col items-center">
  //       <button
  //         className={`w-20 h-20 rounded-lg ${
  //           subspaceImgUrl.type === 'color'
  //             ? subspaceImgUrl.value
  //             : 'bg-gradient-to-r from-slate-500 to-zinc-500'
  //         } hover:opacity-50 cursor-pointer flex justify-center items-center`}
  //         type={'button'}
  //         onClick={() => {
  //           setShowIconPicker(true);
  //         }}
  //       >
  //         <IconPlus size={36} />
  //       </button>
  //       <IconPicker
  //         show={showIconPicker}
  //         onBlur={() => {
  //           setShowIconPicker(false);
  //         }}
  //         onSelect={(val: string) => {
  //           setSubspaceImgUrl({ type: 'color', value: val });
  //           setShowIconPicker(false);
  //         }}
  //         uploadImageNode={
  //           <UploadImage
  //             imageEndpoint="subspace_logo"
  //             onUploadImage={onUploadImage}
  //             displayLabel={
  //               <IconUpload className="hover:opacity-50 cursor-pointer" />
  //             }
  //           />
  //         }
  //       />
  //       <p className="text-xs text-nord-6">{'Add Icon'}</p>
  //     </div>
  //   );
  // };

  const onSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    if (subspaceApi) {
      type SubspaceParameters = Parameters<
        typeof subspaceApi.onCreateSubspace
      >[0];

      const subspaceNamingKeys: (keyof SubspaceParameters)[] = [
        'name',
        'fieldTwo',
        'fieldThree',
        'fieldFour',
      ];

      const iconType: string = subspaceImgUrl.type || '';
      const iconUrl: string = subspaceImgUrl.value || '';

      const subspaceVariable: SubspaceParameters = {
        name: 'placeholder',
        fieldTwo: null,
        fieldThree: null,
        fieldFour: null,
        workspaceId: props.workspaceId || '',
        logoUrl: iconUrl,
        logoType: iconType,
      };

      values.subspace.map((v, ix) => {
        const nKey = subspaceNamingKeys[ix];
        subspaceVariable[nKey] = v;
      });
      await subspaceApi?.onCreateSubspace(subspaceVariable);
    }

    setSubmitting(false);
    props.onSubmit();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={subspaceValidationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        handleChange,
        handleBlur,
        isSubmitting,
        isValid,
        dirty,
        // errors,
      }) => {
        return (
          <Form className="w-full">
            <div className="z-10 w-80 sm:w-80 xl:w-full text-nord-0 dark:text-nord-6 rounded-xl flex flex-wrap flex-col">
              {headerComponent()}
              <div className="px-4 bg-nord-4 dark:bg-nord-1">
                <div className="flex justify-center py-1 mb-2">
                  {['Parent Workspace:', props.workspaceName].map(
                    (subTitle) => {
                      return (
                        <h3 className="text-nord-0 dark:text-nord-6 font-semibold text-lg px-1">
                          {subTitle}
                        </h3>
                      );
                    }
                  )}
                </div>
                <SubspaceIconPicker
                  setShowIconPicker={setShowIconPicker}
                  showIconPicker={showIconPicker}
                  subspaceImgUrl={subspaceImgUrl}
                  setSubspaceImgUrl={setSubspaceImgUrl}
                />
                <div className="px-4">
                  {numOfSubspace.map((spaceName, ix) => {
                    if (spaceName === 'Description') {
                      return (
                        <FormTextArea
                          ix={ix}
                          type={spaceName}
                          value={values.subspace[ix]}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                        />
                      );
                    }

                    return (
                      <FormInput
                        ix={ix}
                        type={spaceName}
                        value={values.subspace[ix]}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="w-full flex justify-center items-center p-4">
                <Button
                  textColor={'gray'}
                  type="submit"
                  disabled={!isValid || !dirty}
                >
                  {isSubmitting ? 'Please wait...' : 'Submit'}
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
