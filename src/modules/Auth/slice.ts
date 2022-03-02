import { createSlice } from '@reduxjs/toolkit';
import { User as UserType } from 'src/generated/types';

type AuthSliceType = {
  data?: UserType
}

const initialState: AuthSliceType = {};

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
