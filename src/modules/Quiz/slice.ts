import { createSlice } from '@reduxjs/toolkit';
import { Quiz as QuizType } from 'src/generated/types';

type QuizSliceType = {
  data?: QuizType[];
};

const initialState: QuizSliceType = {};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    addQuizToStack: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  extraReducers: {},
});

export const { addQuizToStack } = quizSlice.actions;

export default quizSlice.reducer;
