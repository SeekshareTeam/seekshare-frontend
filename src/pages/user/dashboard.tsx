import * as React from 'react';

/* State Management */
import { PageWithLayout } from 'src/utils/types';
import { useAppSelector, useCustomQuery } from 'src/modules/Redux';
import { useFetchPostsByUserLazyQuery } from 'src/generated/apollo';
import { fetchPostsByUser } from 'src/modules/Auth/slice';

/* Components */
import PostManager from 'src/sections/user/Dashboard/PostManager';

const useState = () => {
  return useAppSelector(
    (state) => ({
      auth: state?.auth?.data,
      postsTypeArray: state?.auth?.posts,
    })
  );
};

const useFetchPostsByUserHook = () => {
  const state = useState();

  const fetchPostsByUserQuery = useCustomQuery<
    typeof fetchPostsByUser,
    typeof useFetchPostsByUserLazyQuery
  >(fetchPostsByUser, useFetchPostsByUserLazyQuery, undefined, false);

  React.useEffect(() => {
    if (state?.auth?.currentWorkspace) {
      (async () => {
        if (state?.auth?.currentWorkspace) {
          await fetchPostsByUserQuery({
            variables: { workspaceId: state.auth.currentWorkspace },
          });
        }
      })();
    }
  }, [state.auth, state?.auth?.currentWorkspace]);

};

const UserDashboard: PageWithLayout<{}> = () => {
  const state = useState();

  useFetchPostsByUserHook();

  if (state.postsTypeArray) {
    return <PostManager postsTypeArray={state.postsTypeArray} />;
  } else {
    return null;
  }
};

UserDashboard.accessLevel = { page: 'user' };

UserDashboard.layoutType = 'general';

export default UserDashboard;
