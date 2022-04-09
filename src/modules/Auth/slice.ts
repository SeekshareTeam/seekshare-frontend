import { createSlice } from '@reduxjs/toolkit';
import { User as UserType } from 'src/generated/types';

type AuthSliceType = {
  data?: UserType;
};

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
    subscribeSubspace: (state, action) => {
      if (state?.data === undefined) {
        return;
      }
      const userCurrentWorkspace = state?.data?.userWorkspaces?.find(
        (uw) => uw.id === action.payload.workspaceId
      );

      const hasSubspace = userCurrentWorkspace?.userSubspaces?.find(
        (us) => us.id === action.payload.id
      );

      if (hasSubspace !== undefined) {
        console.log('@ no way in here?', typeof hasSubspace, hasSubspace);
         return;
      }

      userCurrentWorkspace?.userSubspaces?.push(action.payload);
    },
    unsubscribeSubspace: (state, action) => {
      const currentWorkspaceId =  state?.data?.currentWorkspace;

      const currentWorkspace = state?.data?.userWorkspaces?.find(uw => uw.id === currentWorkspaceId);

      const subspaceIndex = currentWorkspace?.userSubspaces?.findIndex(us => us.id === action.payload);

      if (subspaceIndex !== undefined && subspaceIndex >= 0) {
        currentWorkspace?.userSubspaces?.splice(subspaceIndex, 1);
      }
    },
    clearSessionUser: () => {
      // console.log('@ clearsessionnnnn', action.payload);
      return {
        data: undefined,
      };
    },
  },
});

export const { fetchSessionUser, clearSessionUser, subscribeSubspace, unsubscribeSubspace } = authSlice.actions;

export default authSlice.reducer;
