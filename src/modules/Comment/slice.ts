// import { current } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Comment as CommentType } from 'src/generated/types';
type CommentSliceType = {
  data?: CommentType[];
};
const initialState: CommentSliceType = { data: [] };

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    selectAnswer: (state, action) => {
      // const mutatedComment = state?.data?.find(
      //   (c) => c.id === action.payload.id
      // );

      state?.data?.forEach(c => {
        if (c.id === action.payload.id) {
          c.commentAnswers = action.payload;
        } else {
          c.commentAnswers = null;
        }
      });

      // if (mutatedComment) {
      //   mutatedComment.commentAnswers = action.payload.commentAnswers;
        // const keys = Object.keys(
        //   mutatedComment
        // ) as (keyof typeof mutatedComment)[];
        // keys.forEach((k: keyof typeof mutatedComment) => {
        //   mutatedComment[k] = action.payload[k];
        // });
        // Object.keys(mutatedComment).forEach((key) => {
        //   mutatedComment[key as keyof typeof mutatedComment] =
        //     action.payload[key];
        // });
      // }
    },
    createComment: (state, action) => {

      if (state?.data) {
        state.data.push(action.payload);
      }
    },
    fetchCommentsByPost: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    upvoteComment: (state, action) => {
      const mutatedComment = state?.data?.find(
        (c) => c.id === action.payload.id
      );
      if (mutatedComment) {
        mutatedComment.upvotes = action.payload.upvotes;
        mutatedComment.commentVotes = action.payload.commentVotes;
      }
    },
  },
});

export const { createComment, fetchCommentsByPost, upvoteComment, selectAnswer } =
  commentSlice.actions;

export default commentSlice.reducer;
