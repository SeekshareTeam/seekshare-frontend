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
    clearPost: () => {
      // stated.data = undefined
      return {
        data: undefined,
      };
    },
    createPost: (state, action) => {
      // state.data = action.payload
      return {
        ...state,
        data: action.payload,
      };
    },
    fetchPost: (state, action) => {
      // state.data = action.payload
      return {
        ...state,
        data: action.payload,
      };
    },
  },
});

export const { clearPost, createPost, fetchPost } = postSlice.actions;

export default postSlice.reducer;
