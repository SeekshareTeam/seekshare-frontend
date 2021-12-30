import * as React from 'react';

import { useSession } from 'next-auth/react';

import useAuthCheckApi from 'src/components/Layouts/AuthGate/api';
// import { useAppDispatch } from 'src/modules/Redux';
// import { clearSessionUser } from 'src/modules/Auth/slice';

type GeneralLayoutType = {
  page: JSX.Element;
};

export const AuthGate = (props) => {
  const { data: session, status } = useSession();
  const authCheckApi = useAuthCheckApi();

  console.log('@ auth check', session, status);

  React.useEffect(() => {
    console.log('@ astatus', status);
    if (status === 'authenticated') {
      // fetchSessionUser
      (async () => {
        await authCheckApi.fetchAuthenticatedUser();
      })();
      // authenticated
    }
    if (status === 'unauthenticated') {
      console.log('@ in');
      // clearSessionUser
      authCheckApi.clearAuthenticatedUser();
    }
  }, [status]);

  return <>{props.children}</>;
};
