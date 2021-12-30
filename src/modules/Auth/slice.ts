import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchSessionUser: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    clearSessionUser: (state, action) => {
      console.log('@ clearsessionnnnn', action.payload);
      return {
        ...state,
        data: action.payload,
      };
    },
  },
});


export const { fetchSessionUser, clearSessionUser  } = authSlice.actions;

export default authSlice.reducer;
