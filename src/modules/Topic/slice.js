import { createSlice } from '@reduxjs/toolkit';

/*
  create the slice
  export the reducers
  export the actions

*/

export const topicSlice = createSlice({
  name: "topic",
  initialState: {},
  reducers: {
    fetchTopics: (state, action) => {
      return {
        ...state,
        data: action.payload,
      }
    },
  }
})

export const { fetchTopics } = topicSlice.actions;

export default topicSlice.reducer;
