import { createSlice } from '@reduxjs/toolkit';
import { Workspace as WorkspaceType } from 'src/generated/types';
import { HYDRATE } from 'next-redux-wrapper';

type HomeSliceType = {
  workspaces?: WorkspaceType[];
};

const initialState: HomeSliceType = {
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    serverFetchWorkspaces: (state, action) => {
      return {
        ...state,
        workspaces: action.payload
      };
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.home
      }
    }
  }
});

export const { serverFetchWorkspaces, } = homeSlice.actions;

export default homeSlice.reducer;
