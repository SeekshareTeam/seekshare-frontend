import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import {
  Subspace as SubspaceType,
  Workspace as WorkspaceType,
} from 'src/generated/types';

type WorkspaceSliceType = {
  server?: { subspaces?: SubspaceType[]; workspace?: WorkspaceType };
  data?: WorkspaceType;
  subspaces?: SubspaceType[];
};

const initialState: WorkspaceSliceType = {};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    createWorkspace: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    clientFetchSubspaces: (state, action) => {
      return {
        ...state,
        subspaces: action.payload,
      };
    },
    clientClearSubspaces: (state) => {
      return {
        ...state,
        subspaces: [],
      };
    },
    modifyWorkspace: (state, action) => {
      // This is a temporary fix
      const serverState = state?.server || {};

      return {
        ...state,
        server: {
          ...serverState,
          workspace: {
            ...action.payload,
          },
        },
      };
    },
    serverFetchWorkspace: (state, action) => {
      const serverState = state?.server || {};
      return {
        ...state,
        server: {
          ...serverState,
          workspace: action.payload,
        },
      };
    },
    serverFetchSubspaces: (state, action) => {
      const serverState = state?.server || {};
      return {
        ...state,
        server: {
          ...serverState,
          subspaces: action.payload,
        },
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log('@ action', action);
      return {
        ...state,
        server: action.payload.workspace.server,
      };
    },
  },
});

export const {
  createWorkspace,
  serverFetchSubspaces,
  serverFetchWorkspace,
  clientFetchSubspaces,
  clientClearSubspaces,
  modifyWorkspace,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
