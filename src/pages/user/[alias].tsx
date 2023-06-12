import * as React from 'react';

/* State Management */
import { PageWithLayout } from 'src/utils/types';
import { wrapper, useAppSelector, fetchSSRQuery } from 'src/modules/Redux';
import { ssrFetchUserByAlias } from 'src/generated/page';
import { serverFetchUser } from 'src/modules/User/slice';

/* Components */
import UserCard from 'src/components/User/UserCard';

const useState = () => {
  return useAppSelector((state) => ({
    user: state.singleUser?.server,
  }));
};

const UserProfile: PageWithLayout<{}> = () => {
  /**
   * User:
   * Name
   * Alias
   * Number of points? (Maybe)
   * Active Subspaces
   * Interested Subspaces
   * Most active topics:
      - group by tags
      - calculate the number of upvotes on the backend for each of the tags
      - filter the top 3

      - alternatively get the most contributed to
      - filter top 3
   */
  const state = useState();

  if (!state.user) {
    return null;
  }

  return (
    <div className="m-2">
      <UserCard
        name={state.user.alias || ''}
        currentPosition={'Computer Science'}

      />
    </div>
  );
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const alias = context?.params?.alias || '';
    try {
      await fetchSSRQuery({
        action: serverFetchUser,
        ssrApolloQuery: ssrFetchUserByAlias.getServerPage,
        variables: {
          alias,
        },
        dispatch: store.dispatch,
      });
    } catch (e) {
      // TODO log the error in question
      return { notFound: true };
    }

    return {
      props: { alias },
    };
  }
);

UserProfile.layoutType = 'general';

export default UserProfile;
