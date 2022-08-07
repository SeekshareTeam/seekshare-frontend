import * as React from 'react';

import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

import useAuthCheckApi from 'src/components/Layouts/AuthGate/api';
import { useRouter } from 'next/router';
// import { useAppDispatch } from 'src/modules/Redux';
// import { clearSessionUser } from 'src/modules/Auth/slice';

export const AuthGate: React.FC = (props) => {
  const { data: session, status } = useSession();
  // This gets initialized every time Auth Gate is called.
  // Hence loading variable is established multiple times.
  // Not preferred.
  const authCheckApi = useAuthCheckApi();
  const router = useRouter();

  /*
    TODO: Re-route to the login screen if there is refreshTokenError

   */

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

  React.useEffect(() => {
    if (session?.error === 'RefreshTokenError') {
      if (router.pathname !== '/login') {
        authCheckApi.clearAuthenticatedUser();
        router.push('/login');
        signOut({ redirect: false });
      }
    }
  }, [session]);

  return <>{props.children}</>;
};
