import axios from 'axios';

/* Actions */
import { updateAvatar } from 'src/modules/Auth/slice';
import { useAppDispatch } from 'src/modules/Redux';

const api = () => {
  const dispatch = useAppDispatch();

  const onUploadAvatar = async (uploadFile: File, userId: string | undefined) => {
    const formData = new FormData();

    const storagePath = 'user/' + userId + '/avatar';

    if (userId && uploadFile) {
      formData.append('storage_path', storagePath);
      formData.append('user_avatar', uploadFile);
      formData.append('id', userId);

      const responseUrl = await axios({
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-type': 'multipart/form-data',
        },
        url: process.env.NEXT_PUBLIC_IMAGE_SERVICE + 'upload_user_avatar',
        data: formData,
      });

      dispatch(updateAvatar(responseUrl.data));
    }
  };

  return {
    onUploadAvatar,
  };
};

export type AuthApiType = typeof api;
export type AuthApiResultType = ReturnType<AuthApiType>;

export default api;
