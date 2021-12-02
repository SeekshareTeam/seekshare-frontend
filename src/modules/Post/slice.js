import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
  name: "post",
  initialState: {},
  reducers: {
    createPost: (state, action) => {
      return {
        ...state,
        data: action.payload
      }
    },
    fetchPost: (state, action) => {
      return {
        ...state,
        data: action.payload
      }
    }
  }
});

export const { createPost, fetchPost } = postSlice.actions;

export default postSlice.reducer;
