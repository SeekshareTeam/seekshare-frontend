import { createSlice, current } from '@reduxjs/toolkit';

export const commentSlice = createSlice({
  name: 'comment',
  initialState: {},
  reducers: {
    createComment: (state, action) => {
      console.log('@@ current', current(state));
      console.log('@@ create comment data', action.payload);
      console.log('@@@ onemore time', state, state.data);
      console.log('@@ cprintng', [...current(state).data]);
      console.log(
        '@@ cprintng2',
        [...current(state).data].push(action.payload)
      );

      const data = [...state.data];
      data.push(action.payload);

      return {
        ...state,
        data,
      };
    },
    fetchCommentsByPost: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    upvoteComment: (state, action) => {
      const mutatedComment = state.data.find((c) => c.id === action.payload.id);
      console.log('@@ action', action.payload, action?.payload?.commentVotes);
      mutatedComment.upvotes = action.payload.upvotes;
      mutatedComment.commentVotes = action.payload.commentVotes;
    },
  },
});

export const { createComment, fetchCommentsByPost, upvoteComment } =
  commentSlice.actions;

export default commentSlice.reducer;
