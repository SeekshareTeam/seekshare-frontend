import { createSlice } from '@reduxjs/toolkit';
import { User as UserType } from 'src/generated/types';

type UsersSliceType = {
  server?: UserType[];
  client?: UserType[]
};

const initialState: UsersSliceType = {};

export const usersSlice = createSlice({
  name: 'multiple_users',
  initialState,
  reducers: {
    fetchUsersByWorkspace: (state, action) => {
      return {
        ...state,
        client: action.payload,
      }
    }
  },
});

export const { fetchUsersByWorkspace } = usersSlice.actions;

export default usersSlice.reducer;
