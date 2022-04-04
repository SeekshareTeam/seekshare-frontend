import { createSlice } from '@reduxjs/toolkit';
import { Subspace as SubspaceType } from 'src/generated/types';
import { HYDRATE } from 'next-redux-wrapper';

type SubspaceSliceType = {
  server?: SubspaceType;
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

export const { createSubspace, serverFetchSubspace } = subspaceSlice.actions;

export default subspaceSlice.reducer;
