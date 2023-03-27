import * as React from 'react';
import axios from 'axios';

/* Components */
import { UploadImage } from 'src/components/Input/UploadImage';
import { UploadButton, UploadButtonLoader } from 'src/components/Button/Group';
import { Logo, LogoLoader } from 'src/components/Image';

interface LayoutProps {
  title: React.ReactNode;

  logoNode: React.ReactNode;

  uploadImageNode: React.ReactNode;
}

const UploadWorkspaceLogoLayout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="flex flex-col items-start">
      {props.title}
      {props.logoNode}
      {props.uploadImageNode}
    </div>
  );
};

interface Props {
  labelHtmlFor: string;

  logoImage: { value: string | undefined; type: string } | null;

  onImageResponse: (image: { value: string; type: string }) => void;

  workspaceId?: string;

  loading?: boolean;
}

export const UploadWorkspaceLogoLoader: React.FC = () => {
  return (
    <UploadWorkspaceLogoLayout
      title={null}
      logoNode={<LogoLoader />}
      uploadImageNode={<UploadButtonLoader />}
    />
  );
};

const UploadWorkspaceLogo: React.FC<Props> = ({
  loading = false,
  ...props
}) => {
  const onUploadWorkspaceImage = async (uploadFile: File) => {
    const formData = new FormData();

    if (uploadFile && props.workspaceId) {
      formData.append('workspace_image', uploadFile);
      formData.append('file_name', props.workspaceId);

      const workspaceImageResponse = await axios({
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-type': 'multipart/form-data',
        },
        url: process.env.NEXT_PUBLIC_IMAGE_SERVICE + 'upload_image',
        data: formData,
      });

      props.onImageResponse({
        value: workspaceImageResponse?.data,
        type: 'image',
      });
    }
  };

  if (loading) {
    return <UploadWorkspaceLogoLoader />;
  }

  return (
    <UploadWorkspaceLogoLayout
      title={
        <h4 className="dark:text-darkpen-medium font-bold">
          {'Change Workspace Cover Photo'}
        </h4>
      }
      logoNode={
        <Logo
          imgUrl={props.logoImage?.value}
          className={'ml-2 w-16 h-16 shadow rounded'}
        />
      }
      uploadImageNode={
        <UploadImage
          imageEndpoint={'upload_image'}
          onUploadImage={onUploadWorkspaceImage}
          displayLabel={
            <div className="inline-block my-2">
              <UploadButton type="button" text={'Upload Cover Photo'} />
            </div>
          }
        />
      }
    />
  );
};

export default UploadWorkspaceLogo;
