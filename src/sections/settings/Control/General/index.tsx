import * as React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

/* State Management */
import { Workspace as WorkspaceType } from 'src/generated/types';
import { useEditGeneralSettingsMutation } from 'src/generated/apollo';

/* Components */
import { Button } from 'src/components/Button';
import UploadWorkspaceCover from 'src/sections/settings/Control/General/UploadWorkspaceCover';
import UploadWorkspaceLogo from 'src/sections/settings/Control/General/UploadWorkspaceLogo';

interface GeneralLayoutProps {
  uploadWorkspaceCover: React.ReactNode;

  uploadWorkspaceImage: React.ReactNode;

  workspaceName: React.ReactNode;

  workspaceDescription: React.ReactNode;

  submitButton: React.ReactNode;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = (props) => {
  return (
    <div>
      {props.uploadWorkspaceCover}
      {props.uploadWorkspaceImage}
      {props.workspaceName}
      {props.workspaceDescription}
      {props.submitButton}
    </div>
  );
};

interface Props {
  workspace?: WorkspaceType;

  loading: boolean;
}

const General: React.FC<Props> = (props) => {
  const [workspaceCover, setWorkspaceCover] = React.useState<{
    value: string | undefined;
    type: string;
  } | null>(
    { value: props.workspace?.backgroundImage || undefined, type: 'image' } ||
      null
  );
  const [workspaceImage, setWorkspaceImage] = React.useState<{
    value: string | undefined;
    type: string;
  } | null>(
    { value: props.workspace?.url || undefined, type: 'image' } || null
  );

  React.useEffect(() => {
    setWorkspaceCover({
      value: props.workspace?.backgroundImage || undefined,
      type: 'image',
    });
  }, [props.workspace?.backgroundImage]);

  React.useEffect(() => {
    setWorkspaceImage({
      value: props.workspace?.url || undefined,
      type: 'image',
    });
  }, [props.workspace?.url]);

  const [editGeneralSettingsMutation, { loading: editLoading }] =
    useEditGeneralSettingsMutation();

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
          className="rounded-lg shadow-md border border-blue-400 dark:border-night-extralight outline-none focus:ring-2 w-1/2 focus:ring-blue-600 focus:ring-opacity-20 p-1 dark:bg-night-light dark:focus:ring-gray-400"
        />
      </div>
    );
  };

  const generalSettingsSchema = yup.object().shape({
    workspaceName: yup.string().min(2, 'Too short').required('Required!'),
  });

  const initialValues = {
    workspaceName: props?.workspace?.name || '',
    description: props?.workspace?.description || '',
    formLogo: workspaceImage?.value || '',
    formCover: workspaceCover?.value || '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generalSettingsSchema}
      onSubmit={async (values: typeof initialValues) => {
        if (props.workspace?.id) {
          await editGeneralSettingsMutation({
            variables: {
              workspaceInput: {
                name: values.workspaceName,
                description: values.description,
                url: values.formLogo,
                backgroundImage: values.formCover,
                workspaceId: props.workspace.id,
              },
            },
          });
        }
      }}
      enableReinitialize
    >
      {({ values, handleChange, handleBlur, handleSubmit, isValid, dirty }) => (
        <form onSubmit={handleSubmit} className="">
          <GeneralLayout
            uploadWorkspaceCover={
              <UploadWorkspaceCover
                loading={props.loading}
                labelHtmlFor={'workspace_cover'}
                coverImage={workspaceCover}
                onImageResponse={(imageResponse: {
                  value: string;
                  type: string;
                }) => {
                  setWorkspaceCover(imageResponse);
                }}
              />
            }
            uploadWorkspaceImage={
              <UploadWorkspaceLogo
                loading={props.loading}
                labelHtmlFor={'workspaceImageIcon'}
                logoImage={workspaceImage}
                workspaceId={props.workspace?.id}
                onImageResponse={(imageResponse: {
                  value: string;
                  type: string;
                }) => {
                  setWorkspaceImage(imageResponse);
                }}
              />
            }
            workspaceName={newInputFormRow({
              labelHtmlFor: 'workspaceName',
              labelName: 'Workspace Name',
              inputValue: values,
              handleChange,
              handleBlur,
            })}
            workspaceDescription={newTextareaFormRow({
              labelHtmlFor: 'description',
              labelName: 'Description',
              inputValue: values,
              handleChange,
              handleBlur,
            })}
            submitButton={
              <Button
                disabled={!isValid || !dirty}
                variant={'primary'}
                size={'medium'}
                radius={'small'}
                loading={editLoading}
                type="submit"
              >
                {'Update'}
              </Button>
            }
          />
        </form>
      )}
    </Formik>
  );
};

export default General;
