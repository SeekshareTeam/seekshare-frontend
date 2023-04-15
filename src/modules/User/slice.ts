import { HYDRATE } from 'next-redux-wrapper';
import { createSlice } from '@reduxjs/toolkit';
import { User as UserType } from 'src/generated/types';

type UserSliceType = {
  client?: UserType;
  server?: UserType;
};

const initialState: UserSliceType = {};

export const userSlice = createSlice({
  name: 'single_user',
  initialState,
  reducers: {
    serverFetchUser: (state, action) => {
      return {
        ...state,
        server: action.payload,
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log('@ action', action);
      return {
        ...state,
        server: action.payload.singleUser.server,
      };
    },
  },
});

export const { serverFetchUser } = userSlice.actions;

export default userSlice.reducer;
