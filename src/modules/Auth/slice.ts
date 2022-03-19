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
    clearSessionUser: () => {
      // console.log('@ clearsessionnnnn', action.payload);
      return {
        data: undefined,
      };
    },
  },
});


export const { fetchSessionUser, clearSessionUser  } = authSlice.actions;

export default authSlice.reducer;
