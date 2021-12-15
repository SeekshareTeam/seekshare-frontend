import { createSlice } from '@reduxjs/toolkit';
import { Post as PostType } from 'src/generated/types';
type PostSliceType = {
  data?: PostType;
};

const initialState: PostSliceType = {};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    createPost: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    fetchPost: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
});

export const { createPost, fetchPost } = postSlice.actions;

export default postSlice.reducer;
