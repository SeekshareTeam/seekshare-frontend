import { createSlice } from '@reduxjs/toolkit';
import { Post as PostType } from 'src/generated/types';
// import { HYDRATE } from 'next-redux-wrapper';

type PostListSliceType = {
  client?: PostType[];
};

const initialState: PostListSliceType = {};

export const postListSlice = createSlice({
  name: 'postlist',
  initialState,
  reducers: {
    fetchPostList: (state, action) => {
      return {
        ...state,
        client: action.payload,
      }
    },
    // serverFetchPostList: (state, action) => {
    //   return {
    //     ...state,
    //     data: action.payload
    //   }
    // },
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       data: action?.payload?.postList?.data,
  //     };
  //   },
  // },
});

export const { fetchPostList } = postListSlice.actions;

export default postListSlice.reducer;
