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

export const { subspaceSlice } = subspaceSlice.actions;

export default subspaceSlice.reducer;
