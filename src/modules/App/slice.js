import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: { loading: false },
  reducers: {
    setLoading: (state, action) => {
      return {
        loading: action.payload,
      };
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
