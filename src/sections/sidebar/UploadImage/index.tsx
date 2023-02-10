import * as React from 'react';
import axios from 'axios';

interface Props {
  /**
   * Name of the file to store.
   */
  fileName: string;
  /**
   * Text to display for upload button.
   */
  displayLabel?: React.ReactNode;
}

export const UploadImage: React.FC<Props> = (props) => {
  const onUploadImage = async (uploadFile: File) => {
    const formData = new FormData();

    if (uploadFile) {
      formData.append('file_name', props.fileName);
      formData.append('workspace_image', uploadFile);

      await axios({
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-type': 'multipart/form-data',
        },
        url: process.env.NEXT_PUBLIC_IMAGE_UPLOAD,
        data: formData,
      });
    }
  };

  return (
    <>
      <label htmlFor="sidebar_upload_image">
        {props.displayLabel || 'Upload File'}
      </label>
      <input
        className={'hidden'}
        name="upload_image"
        type="file"
        id="sidebar_upload_image"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            onUploadImage(e.target.files[0]);
          }
        }}
      />
    </>
  );
};
