import { createSlice } from '@reduxjs/toolkit';
import { Post as PostType } from 'src/generated/types';
import { HYDRATE } from 'next-redux-wrapper';

type PostSliceType = {
  data?: PostType;
};

const initialState: PostSliceType = {};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearPost: () => {
      return {
        data: undefined,
      };
    },
    createPost: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    serverFetchPost: (state, action) => {
      return {
        ...state,
        data: action.payload
      }
    },
    fetchPost: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        data: action.payload.post.data,
      };
    },
  },
});

export const { clearPost, createPost, fetchPost, serverFetchPost } = postSlice.actions;

export default postSlice.reducer;
