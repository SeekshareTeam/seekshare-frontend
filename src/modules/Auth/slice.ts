import { createSlice } from '@reduxjs/toolkit';
import { User as UserType, PostTypeArray } from 'src/generated/types';

type AuthSliceType = {
  data?: UserType;
  posts?: PostTypeArray[];
};

const initialState: AuthSliceType = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAvatar: (state, action) => {
      if (state?.data) {
        return {
          ...state,
          data: {
            ...state.data,
            avatar: action.payload,
          },
        };
      }
      return {
        ...state,
      };
    },
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
        return;
      }

      userCurrentWorkspace?.userSubspaces?.push(action.payload);
    },
    unsubscribeSubspace: (state, action) => {
      const currentWorkspaceId = state?.data?.currentWorkspace;

      const currentWorkspace = state?.data?.userWorkspaces?.find(
        (uw) => uw.id === currentWorkspaceId
      );

      const subspaceIndex = currentWorkspace?.userSubspaces?.findIndex(
        (us) => us.id === action.payload
      );

      if (subspaceIndex !== undefined && subspaceIndex >= 0) {
        currentWorkspace?.userSubspaces?.splice(subspaceIndex, 1);
      }
    },
    fetchPostsByUser: (state, action) => {
      return {
        ...state,
        posts: action.payload
      }
    },
    clearSessionUser: () => {
      return {
        data: undefined,
      };
    },
  },
});

export const {
  fetchSessionUser,
  clearSessionUser,
  subscribeSubspace,
  unsubscribeSubspace,
  updateAvatar,
  fetchPostsByUser,
} = authSlice.actions;

export default authSlice.reducer;
