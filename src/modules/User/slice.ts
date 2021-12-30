import { createSlice } from '@reduxjs/toolkit';
import { User as UserType } from 'src/generated/types';

type UserSliceType = {
  data?: UserType;
};

const initialState: UserSliceType = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    validateUser: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
});

export const { validateUser } = userSlice.actions;

export default userSlice.reducer;
