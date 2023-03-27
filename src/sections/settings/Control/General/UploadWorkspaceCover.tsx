import * as React from 'react';
import axios from 'axios';

/* Components */
import { UploadImage } from 'src/components/Input/UploadImage';
import { UploadButton, UploadButtonLoader } from 'src/components/Button/Group';
import { CoverImage, CoverImageLoader } from 'src/components/Image';

interface LayoutProps {
  title: React.ReactNode;

  coverImageNode: React.ReactNode;

  uploadImageNode: React.ReactNode;
}

const UploadWorkspaceCoverLayout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="flex flex-col items-start">
      {props.title}
      {props.coverImageNode}
      {props.uploadImageNode}
    </div>
  );
};

interface Props {
  labelHtmlFor: string;

  coverImage: { value: string | undefined; type: string } | null;

  onImageResponse: (image: { value: string; type: string }) => void;

  loading?: boolean;
}

export const UploadWorkspaceCoverLoader: React.FC = () => {
  return (
    <UploadWorkspaceCoverLayout
      title={null}
      coverImageNode={<CoverImageLoader />}
      uploadImageNode={<UploadButtonLoader />}
    />
  );
};

const UploadWorkspaceCover: React.FC<Props> = ({
  loading = false,
  ...props
}) => {
  const onUploadWorkspaceCover = async (uploadFile: File) => {
    const formData = new FormData();

    if (uploadFile) {
      formData.append('workspace_cover', uploadFile);

      const workspaceCoverResponse = await axios({
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-type': 'multipart/form-data',
        },
        url: process.env.NEXT_PUBLIC_IMAGE_SERVICE + 'upload_workspace_cover',
        data: formData,
      });

      if (workspaceCoverResponse?.data) {
        props.onImageResponse({
          value: workspaceCoverResponse.data,
          type: 'image',
        });
      }
    }
  };

  if (loading) {
    return <UploadWorkspaceCoverLoader />;
  }

  return (
    <UploadWorkspaceCoverLayout
      title={
        <h4 className="dark:text-darkpen-medium font-bold">
          {'Change Workspace Cover Photo'}
        </h4>
      }
      coverImageNode={
        <div className="p-0.5 dark:bg-night-light rounded overflow-hidden shadow">
          <CoverImage
            className={'w-80 h-44 rounded'}
            imgUrl={props.coverImage?.value}
          />
        </div>
      }
      uploadImageNode={
        <UploadImage
          imageEndpoint={'workspace_cover'}
          onUploadImage={onUploadWorkspaceCover}
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

export default UploadWorkspaceCover;
