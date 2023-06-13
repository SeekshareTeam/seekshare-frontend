import { createSlice, current } from '@reduxjs/toolkit';
import { Quiz as QuizType } from 'src/generated/types';

import { isEmpty } from 'lodash';

type QuizSliceType = {
  data?: QuizType[];
};

const initialState: QuizSliceType = {};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    addQuizToStack: (state, action) => {
      console.log('@@@ state', current(state), action);

      if (isEmpty(state?.data)) {
        state.data = [action.payload];
      } else {
        if (state?.data) {
          state.data.push(action.payload);
        }
      }
    },
  },
  extraReducers: {},
});

export const { addQuizToStack } = quizSlice.actions;

export default quizSlice.reducer;
