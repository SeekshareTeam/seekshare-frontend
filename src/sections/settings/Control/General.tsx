import * as React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import { IconUpload } from '@tabler/icons';

/* State Management */
import { Workspace as WorkspaceType } from 'src/generated/types';

/* Components */
import { Button } from 'src/components/Button';
import { UploadImage } from 'src/components/Input/UploadImage';

interface Props {
  workspace: WorkspaceType;

  loading: boolean;
}

const General: React.FC<Props> = (props) => {
  const [workspaceImgObj, setWorkspaceImgObj] = React.useState<{
    value: string;
    type: string;
  } | null>(null);


  const renderUploadButton = ({ title }: { title: string; }) => {
    return (
      <Button
        variant="dark"
        className="flex flex-row">
        <span>{title}</span>
        <IconUpload size={16} />
      </Button>
    );
  };

  // const onUploadCoverPhoto = async (uploadFile: File) => {
  //   const formData = new FormData();

  //   if (uploadFile) {
  //     formData.append('workspace_cover');

  //     const workspaceCoverRes = await axios({
  //       method: 'post',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-type': 'multipart/form-data',
  //       },
  //       url: process.env.NEXT_PUBLIC_IMAGE_SERVICE + 'upload_iamge',
  //       data: formData,
  //     });
  //   }

  // };

  const modifyWorkspaceCover = ({ labelHtmlFor }: { labelHtmlFor: string }) => {
    console.log('labelHtmlFor', labelHtmlFor);
    return (
      <div className="flex flex-col items-start">
        <p className="dark:text-darkpen-medium font-bold">
          {'Change Workspace Cover Photo'}
        </p>
        <div
          className="w-80 h-44"
          style={{
            backgroundImage: `url(\'${props.workspace?.backgroundImage}\')`,
          }}
        ></div>
        <UploadImage
          imageEndpoint={'upload_image'}
          onUploadImage={onUploadWorkspaceImage}
          displayLabel={renderUploadButton({ title: 'Upload Cover Photo' })}
        />
      </div>
    );
  };

  const onUploadWorkspaceImage = async (uploadFile: File) => {
    const formData = new FormData();

    if (uploadFile) {
      formData.append('workspace_logo', uploadFile);

      const workspaceImgRes = await axios({
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-type': 'multipart/form-data',
        },
        url: process.env.NEXT_PUBLIC_IMAGE_SERVICE + 'upload_iamge',
        data: formData,
      });

      setWorkspaceImgObj({ value: workspaceImgRes?.data, type: 'image' });
    }
  };

  const modifyWorkspaceImage = ({ labelHtmlFor }: { labelHtmlFor: string }) => {
    workspaceImgObj;
    return (
      <div className="flex flex-col items-start">
        <label
          className="dark:text-darkpen-medium font-bold"
          htmlFor={labelHtmlFor}
        >
          {'Change Workspace Icon'}
        </label>
        <img
          src={props.workspace?.url || undefined}
          className="ml-2 w-16 h-16 shadow rounded"
        />
        <UploadImage
          imageEndpoint={'upload_image'}
          onUploadImage={onUploadWorkspaceImage}
          displayLabel={renderUploadButton({ title: 'Upload Workspace Logo' })}
        />
      </div>
    );
  };

  const newInputFormRow = ({
    labelHtmlFor,
    labelName,
    inputValue,
    handleChange,
    handleBlur,
  }: {
    labelHtmlFor: string;
    labelName: string;
    inputValue: { [field: string]: any };
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: any) => void;
  }) => {
    return (
      <div className="flex flex-col space-y-1 items-start">
        <label
          className="dark:text-darkpen-medium font-bold"
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
            className="dark:bg-night-light rounded dark:text-darkpen-medium"
          />
          <Button
            variant="dark"
            fillColor="dark"
            onClick={() => {}}
          >
            {'Rename'}
          </Button>
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
    inputValue: { [field: string]: any };
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: any) => void;
  }) => {
    return (
      <div className="flex flex-col py-2 items-start justify-between text-lightpen-medium dark:text-darkpen-medium">
        <label className="font-bold capitalize" htmlFor={labelHtmlFor}>
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
          className="rounded-lg shadow-md border border-blue-400 dark:border-darkpen-dark outline-none focus:ring-2 w-1/2 focus:ring-blue-600 focus:ring-opacity-20 p-1 dark:bg-night-light dark:focus:ring-gray-400"
        />
      </div>
    );
  };

  const generalSettingsSchema = yup.object().shape({
    workspaceName: yup
      .string()
      .min(2, 'Too short')
      .max(50, 'Too Long!')
      .required('Required!'),
  });

  return (
    <Formik
      initialValues={{
        workspaceName: props.workspace?.name || '',
        description: props.workspace?.description || '',
      }}
      validationSchema={generalSettingsSchema}
      onSubmit={() => {}}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="">
          {modifyWorkspaceCover({ labelHtmlFor: 'workspace_cover' })}
          {modifyWorkspaceImage({ labelHtmlFor: 'workspaceImageIcon' })}
          {newInputFormRow({
            labelHtmlFor: 'workspaceName',
            labelName: 'Workspace Name',
            inputValue: values,
            handleChange,
            handleBlur,
          })}
          {newTextareaFormRow({
            labelHtmlFor: 'description',
            labelName: 'Description',
            inputValue: values,
            handleChange,
            handleBlur,
          })}
        </form>
      )}
    </Formik>
  );
};

export default General;
