import { createSlice } from '@reduxjs/toolkit';

import { Quiz as QuizType, PublishedSet } from 'src/generated/types';

import { isEmpty } from 'lodash';

type QuizSliceType = {
  data: {
    queue?: QuizType[];
    currentWorksheet?: QuizType[];
    publishedWorksheet?: PublishedSet;
  };
};

const initialState: QuizSliceType = { data: {} };

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    addQuizToQueue: (state, action) => {
      if (isEmpty(state?.data?.queue)) {
        state.data = { queue: [action.payload] };
      } else {
        if (state?.data?.queue) {
          const qIndex = state.data.queue.findIndex((q) => {
            if (q.id === action.payload.id) {
              return true;
            } else {
              return false;
            }
          });

          if (qIndex < 0) {
            state.data.queue.push(action.payload);
          } else {
            state.data.queue.splice(qIndex, 1);
          }
        }
      }
    },
    clearQuizQueue: (state) => {
      if (!isEmpty(state?.data)) {
        state.data.queue = undefined;
      }
    },
    addWorksheet: (state, action) => {
      console.log('@@@ action', action);
      if (isEmpty(state?.data)) {
        state.data = { publishedWorksheet: action.payload };
      } else {
        state.data.publishedWorksheet = action.payload
      }
    },
    fetchWorksheet: (state, action) => {
      if (isEmpty(state?.data)) {
        state.data = { publishedWorksheet: action.payload };
      } else {
        state.data.publishedWorksheet = action.payload
      }
    },
  },
  extraReducers: {},
});

export const { addQuizToQueue, clearQuizQueue, addWorksheet, fetchWorksheet } =
  quizSlice.actions;

export default quizSlice.reducer;
