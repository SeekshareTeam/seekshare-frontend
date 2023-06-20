import { createSlice } from '@reduxjs/toolkit';
import {
  Subspace as SubspaceType,
  Quiz as QuizType,
} from 'src/generated/types';
import { HYDRATE } from 'next-redux-wrapper';

type SubspaceSliceType = {
  server?: SubspaceType;
  quizzes?: QuizType[];
};

const initialState: SubspaceSliceType = {};

const subspaceSlice = createSlice({
  name: 'subspace',
  initialState,
  reducers: {
    createSubspace: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    serverFetchSubspace: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    fetchSubspaceQuizList: (state, action) => {
      return {
        ...state,
        quizzes: action.payload,
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        server: action.payload.subspace.data,
      };
    },
  },
});

export const { createSubspace, serverFetchSubspace, fetchSubspaceQuizList } =
  subspaceSlice.actions;

export default subspaceSlice.reducer;
