import { createSlice } from '@reduxjs/toolkit';

export const commentSlice = createSlice({
  name: "comment",
  initialState: {},
  reducers: {
    createComment: (state, action) => {
      return {
        ...state,
        data: action.payload
      }
    },
    fetchCommentsByPost: (state, action) => {
      return {
        ...state,
        data: action.payload
      }
    },
  }
});

export const { createComment, fetchCommentsByPost } = commentSlice.actions;

export default commentSlice.reducer;

