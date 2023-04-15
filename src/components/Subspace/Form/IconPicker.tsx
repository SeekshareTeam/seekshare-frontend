import * as React from 'react';
import axios from 'axios';

/* Components */
import { UploadImage } from 'src/components/Input/UploadImage';
import { IconPlus, IconUpload } from '@tabler/icons';
import IconPicker from 'src/components/IconPicker';


interface Props {
  setShowIconPicker: (val: boolean) => void;
  showIconPicker: boolean;
  subspaceImgUrl: {
    type: 'color' | 'image';
    value: string;
  };
  setSubspaceImgUrl: (val: { type: 'color' | 'image'; value: string }) => void;
}

const SubspaceIconPicker: React.FC<Props> = (props) => {

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

      props.setSubspaceImgUrl({ value: subspaceImgRes?.data, type: 'image' });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className={`w-20 h-20 rounded-lg ${
          props.subspaceImgUrl.type === 'color'
            ? props.subspaceImgUrl.value
            : 'bg-gradient-to-r from-slate-500 to-zinc-500'
        } hover:opacity-50 cursor-pointer flex justify-center items-center`}
        type={'button'}
        onClick={() => {
          props.setShowIconPicker(true);
        }}
      >
        <IconPlus size={36} />
      </button>
      <IconPicker
        show={props.showIconPicker}
        onBlur={() => {
          props.setShowIconPicker(false);
        }}
        onSelect={(val: string) => {
          props.setSubspaceImgUrl({ type: 'color', value: val });
          props.setShowIconPicker(false);
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

export default SubspaceIconPicker;
