import { createSlice } from '@reduxjs/toolkit';
import { Quiz as QuizType, PublishedSet } from 'src/generated/types';

import { isEmpty } from 'lodash';

type QuizSliceType = {
  data?: {
    queue?: QuizType[];
    currentWorksheet?: QuizType[];
    publishedWorksheet?: PublishedSet;
  };
};

const initialState: QuizSliceType = {};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    addQuizToStack: (state, action) => {
      if (isEmpty(state?.data)) {
        state.data = { queue: [action.payload] };
      } else {
        if (state?.data?.queue) {
          state.data.queue.push(action.payload);
        }
      }
    },
    addWorksheet: (state, action) => {
      if (isEmpty(state?.data)) {
        state.data = { currentWorksheet: action.payload };
      }
    },
    fetchWorksheet: (state, action) => {
      if (isEmpty(state?.data)) {
        state.data = { publishedWorksheet: action.payload };
      }
    }
  },
  extraReducers: {},
});

export const { addQuizToStack, addWorksheet, fetchWorksheet } = quizSlice.actions;

export default quizSlice.reducer;
