import * as React from 'react';
// import axios from 'axios';

interface Props {
  /**
   * Path to the handler of the image on the backend.
   * This value correlates to one of the endpoints available
   * for image proessing.
   */
  imageEndpoint: string;
  /**
   * Text to display for upload button.
   */
  displayLabel?: React.ReactNode;
  /**
   *
   */
  onUploadImage: (uploadFile: File) => Promise<void>;
}

export const UploadImage: React.FC<Props> = (props) => {

  return (
    <>
      <label htmlFor={`${props.imageEndpoint}_upload_image`}>
        {props.displayLabel || 'Upload File'}
      </label>
      <input
        className={'hidden'}
        name="upload_image"
        type="file"
        id={`${props.imageEndpoint}_upload_image`}
        accept="image/png, image/jpeg"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            props.onUploadImage(e.target.files[0]);
          }
        }}
      />
    </>
  );
};
