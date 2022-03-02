import { createSlice } from '@reduxjs/toolkit';

const subspaceSlice = createSlice({
  name: 'subspace',
  initialState: {},
  reducers: {
    createSubspace: (state, action) => {
      return {
        ...state,
        data: action.payload
      }
    }
  }
});

export const { createSubspace } = subspaceSlice.actions;

export default subspaceSlice.reducer;
