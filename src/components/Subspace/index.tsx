import * as React from 'react';
import * as yup from 'yup';
import axios from 'axios';

// import { DefaultColors } from 'tailwindcss/types/generated/colors';
// import { toast } from 'react-toastify'

import { IconPlus, IconUpload } from '@tabler/icons';

import { Formik, Form, FormikHelpers } from 'formik';
import { Button } from 'src/components/Button';
import { useSubspaceApi } from 'src/api/context';
import { UploadImage } from 'src/components/Input/UploadImage';

import IconPicker from 'src/components/IconPicker';

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

  const strHashFunction = (subString: string) => {
    const colorHash =
      [...subString].reduce((acc, v) => acc + v.charCodeAt(0), 0) % 15;
    console.log(colorHash);
  };

  const headerComponent = () => {
    return (
      <div className="bg-gray-50 dark:bg-dusk-dark py-4 px-6 flex flex-col rounded-t-xl w-full items-center justify-center">
        <h2 className="font-semibold text-gray-700 dark:text-darkpen-medium text-xl">
          {'Add Subspace'}
        </h2>
        <p className="text-darkpen-dark font-light text-xs">
          {
            'Subspaces are work stations that belong to a parent Workspace. In a subspace you can manage content, members, and permissions.'
          }
        </p>
      </div>
    );
  };

  const addInput = (
    ix: number,
    type: string,
    value: string,
    handleChange: (e: React.ChangeEvent<any>) => void,
    handleBlur: (e: any) => void
  ) => {
    return (
      <div className="flex flex-col py-1 justify-between items-start">
        <label
          className="font-semibold text-sm capitalize text-gray-700 dark:text-darkpen-dark"
          htmlFor={`subspace.${ix}`}
        >
          {type}
        </label>
        <input
          name={`subspace.${ix}`}
          onChange={(val) => {
            handleChange(val);
            strHashFunction(val.target.value);
          }}
          onBlur={handleBlur}
          value={value}
          className="rounded md:w-full xs:flex-1 dark:bg-dusk-dark shadow-md border focus:border-blue-400 outline-none focus:ring-1 focus:ring-blue-600 focus:ring-opacity-20 p-1"
        />
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

  const addTextArea = (
    ix: number,
    type: string,
    value: string,
    handleChange: (e: React.ChangeEvent<any>) => void,
    handleBlur: (e: any) => void
  ) => {
    return (
      <div className="flex flex-col py-1 justify-between items-start">
        <label
          className="font-semibold text-sm capitalize text-gray-700 dark:text-darkpen-dark"
          htmlFor={`subspace.${ix}`}
        >
          {type}
        </label>
        <textarea
          style={{ resize: 'none' }}
          name={`subspace.${ix}`}
          placeholder={'Optional'}
          onChange={handleChange}
          id={`subspace.${ix}`}
          onBlur={handleBlur}
          value={value}
          rows={4}
          className="rounded-lg shadow-md w-full border border-blue-400 dark:border-gray-300 outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 p-1 dark:bg-dusk-dark dark:focus:ring-gray-400"
        />
      </div>
    );
  };

  const iconPicker = () => {
    return (
      <div className="flex flex-col items-center">
        <button
          className={`w-20 h-20 rounded-lg ${
            subspaceImgUrl.type === 'color'
              ? subspaceImgUrl.value
              : 'bg-gradient-to-r from-slate-500 to-zinc-500'
          } hover:opacity-50 cursor-pointer flex justify-center items-center`}
          type={'button'}
          onClick={() => {
            setShowIconPicker(true);
          }}
        >
          <IconPlus size={36} />
        </button>
        <IconPicker
          show={showIconPicker}
          onBlur={() => {
            setShowIconPicker(false);
          }}
          onSelect={(val: string) => {
            setSubspaceImgUrl({ type: 'color', value: val });
            setShowIconPicker(false);
          }}
          uploadImageNode={
            <UploadImage
              imageEndpoint="subspace_logo"
              onUploadImage={onUploadImage}
              displayLabel={
                <IconUpload className="hover:opacity-50 cursor-pointer" />
              }
            />
          }
        />
        <p className="text-xs text-darkpen-dark">{'Add Icon'}</p>
      </div>
    );
  };

  const onUploadImage = async (uploadFile: File) => {
    const formData = new FormData();

    if (uploadFile) {
      formData.append('subspace_logo', uploadFile);

      const subspaceImgRes = await axios({
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-type': 'multipart/form-data',
        },
        url: process.env.NEXT_PUBLIC_IMAGE_SERVICE + 'upload_subspace_logo',
        data: formData,
      });

      setSubspaceImgUrl({ value: subspaceImgRes?.data, type: 'image' });
    }
  };

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

      let iconUrl: string = subspaceImgUrl.type || '';
      let iconType: string = subspaceImgUrl.value || '';

      const subspaceVariable: SubspaceParameters = {
        name: 'placeholder',
        fieldTwo: null,
        fieldThree: null,
        fieldFour: null,
        workspaceId: props.workspaceId || '',
        subspaceImgUrl: iconUrl,
        subspaceImgType: iconType,
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
      {({ values, handleChange, handleBlur, isSubmitting, isValid, dirty, errors }) => {
        console.log('subit form error', errors);
        return (
          <Form className="w-full">
            <div className="z-10 w-80 sm:w-80 xl:w-full dark:text-darkpen-medium rounded-xl flex flex-wrap flex-col">
              {headerComponent()}
              <div className="px-4 dark:bg-dusk-dark">
                <div className="flex justify-center py-1 mb-2">
                  {['Parent Workspace:', props.workspaceName].map(
                    (subTitle) => {
                      return (
                        <h3 className="dark:text-darkpen-medium font-semibold text-lg px-1">
                          {subTitle}
                        </h3>
                      );
                    }
                  )}
                </div>
                {iconPicker()}
                <div className="px-4">
                  {numOfSubspace.map((spaceName, ix) => {
                    if (spaceName === 'Description') {
                      return addTextArea(
                        ix,
                        spaceName,
                        values.subspace[ix],
                        handleChange,
                        handleBlur
                      );
                    }
                    return addInput(
                      ix,
                      spaceName,
                      values.subspace[ix],
                      handleChange,
                      handleBlur
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
