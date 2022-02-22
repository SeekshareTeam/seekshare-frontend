import { createSlice } from '@reduxjs/toolkit';

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: {},
  reducers: {
    createWorkspace: (state, action) => {
      return {
        ...state,
        data: action.payload
      }
    }
  }
});

export const { createWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
