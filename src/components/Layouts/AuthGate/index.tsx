import * as React from 'react';

import { useSession } from 'next-auth/react';

import useAuthCheckApi from 'src/components/Layouts/AuthGate/api';
// import { useAppDispatch } from 'src/modules/Redux';
// import { clearSessionUser } from 'src/modules/Auth/slice';

export const AuthGate: React.FC = (props) => {
  const { data: session, status } = useSession();
  // This gets initialized every time Auth Gate is called.
  // Hence loading variable is established multiple times.
  // Not preferred.
  console.log('@ session', session);
  const authCheckApi = useAuthCheckApi();

  React.useEffect(() => {
    if (status === 'authenticated') {
      // fetchSessionUser
      (async () => {
        await authCheckApi.fetchAuthenticatedUser();
      })();
      // authenticated
    }
    if (status === 'unauthenticated') {
      // clearSessionUser
      authCheckApi.clearAuthenticatedUser();
    }
  }, [status]);

  return <>{props.children}</>;
};
