import * as React from 'react';

import { fetchSessionUser, clearSessionUser } from 'src/modules/Auth/slice';
import { useCustomQuery } from 'src/modules/Redux';
import { useUserAuthenticatedLazyQuery } from 'src/generated/apollo';

import { useAppDispatch } from 'src/modules/Redux';

const api = () => {
  const dispatch = useAppDispatch();
  const fetchAuthenticatedUser = useCustomQuery<
    typeof fetchSessionUser,
    typeof useUserAuthenticatedLazyQuery
  >(fetchSessionUser, useUserAuthenticatedLazyQuery, undefined, false);

  const clearAuthenticatedUser = React.useCallback(() => {
    dispatch(clearSessionUser());
  }, []);

  return React.useMemo(
    () => ({
      fetchAuthenticatedUser,
      clearAuthenticatedUser,
    }),
    [fetchAuthenticatedUser, clearAuthenticatedUser]
  );
};

export type AuthCheckApiType = typeof api;

export type AuthCheckApiResultsType = ReturnType<AuthCheckApiType>;

// export type CommentsApiResult = ReturnType<typeof api>

export default api;
