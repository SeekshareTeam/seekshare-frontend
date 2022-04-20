import * as React from 'react';
import { UnderlineTabs } from 'src/components/Tabs';
import { PostCard } from 'src/components/Post/card';
import { wrapper, fetchSSRQuery } from 'src/modules/Redux';
import { fetchPostList } from 'src/modules/PostList/slice';
import { serverFetchSubspace } from 'src/modules/Subspace/slice';
import {
  //   ssrFetchAllPostsFromSubspace,
  ssrFetchSubspace,
} from 'src/generated/page';
import { useFetchAllPostsFromSubspaceLazyQuery } from 'src/generated/apollo';
import { useAppSelector, useCustomQuery } from 'src/modules/Redux';
import { shallowEqual } from 'react-redux';
import { upperCase } from 'lodash';
import { useSubspaceApi } from 'src/api/context';
import Head from 'next/head';
import { NextPage } from 'next';

type PageWithLayout<T> = NextPage<T> & { layoutType: string };

interface SubspacePageProps {
  workspaceId: string;
  subspaceId: string;
}

const SubspacePage: PageWithLayout<SubspacePageProps> = (props) => {
  const [tabs] = React.useState([
    { tabValue: 'Posts', tabKey: 'posts' },
    { tabValue: 'Q + A', tabKey: 'q_+_a' },
    { tabValue: 'Question Bank', tabKey: 'quizzes' },
  ]);

  const [selectedTab, setSelectedTab] = React.useState('posts');

  const useFetchAllPostsFromSubspace = useCustomQuery(
    fetchPostList,
    useFetchAllPostsFromSubspaceLazyQuery,
    undefined,
    false
  );

  const subspaceApi = useSubspaceApi();

  React.useEffect(() => {
    if (selectedTab && props.workspaceId && props.subspaceId) {
      console.log('@ selectedTab', selectedTab, props.workspaceId);
      switch (selectedTab) {
        case 'posts':
          console.log('@ er who', props.subspaceId, props.workspaceId);
          useFetchAllPostsFromSubspace({
            variables: {
              workspaceId: props.workspaceId,
              subspaceId: props.subspaceId,
            },
          });
        default:
          console.log('doki');
      }
    }
  }, [selectedTab, props.subspaceId, props.workspaceId]);

  const reduxState = useAppSelector(
    (state) => ({
      auth: state.auth?.data,
      postList: state.postList?.client,
      subspace: state.subspace?.server,
      hasSubspace: state?.auth?.data?.userWorkspaces
        ?.find((uw) => {
          return uw.id === props.workspaceId;
        })
        ?.userSubspaces?.find((us) => us.id === props.subspaceId)
        ? true
        : false,
    }),
    shallowEqual
  );

  const onTabClick = (tabKey: string) => {
    setSelectedTab(tabKey);
  };

  return (
    <div>
      <Head>
        <title>Subspace</title>
      </Head>
      <div className="flex w-full flex-wrap">
        <div className="flex justify-start flex-1">
          <div className="w-24 h-24 justify-self-start rounded-lg angel_care shadow relative ml-24">
            <div className="absolute bottom-0 left-0 px-2 py-0.5 text-gray-700 shadow-sm font-medium text-3xl rounded-md translate-x-12 translate-y-2 transform bg-white whitespace-nowrap">
              <h2>{reduxState?.subspace?.name || 'Loading...'}</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-end">
          {!reduxState?.hasSubspace &&
            reduxState?.subspace?.name &&
            reduxState?.auth && (
              <button
                onClick={async () => {
                  if (subspaceApi?.onSubscribeSubspace) {
                    subspaceApi.onSubscribeSubspace({
                      workspaceId: props.workspaceId,
                      subspaceId: props.subspaceId,
                    });
                  }
                  // await subscribeSubspaceMutation({
                  //   variables: {
                  //     workspaceId: props.workspaceId,
                  //     subspaceId: props.subspaceId,
                  //   },
                  // });
                }}
                className="text-pink-700 mr-4 outline-none border border-pink-700 text-sm self-center px-2 py-0.5 rounded-full hover:bg-pink-700 hover:text-gray-100 transition-all duration-200"
              >
                {`JOIN ${upperCase(reduxState.subspace.name)}`}
              </button>
            )}
          {reduxState?.hasSubspace && reduxState?.subspace && reduxState?.auth && (
            <button
              onClick={async () => {
                if (subspaceApi?.onUnsubscribeSubspace) {
                  subspaceApi.onUnsubscribeSubspace({
                    subspaceId: props.subspaceId,
                  });
                }
              }}
              className="text-pink-700 mr-4 outline-none border border-pink-700 text-sm self-center px-2 py-0.5 rounded-full hover:bg-pink-700 hover:text-gray-100 transition-all duration-200"
            >
              {`LEAVE ${upperCase(reduxState.subspace.name)}`}
            </button>
          )}
        </div>
      </div>
      <UnderlineTabs
        tabs={tabs}
        onSelectTab={onTabClick}
        active={selectedTab}
      />
      {selectedTab === 'posts' && (
        <div className="flex flex-col items-center">
          {reduxState?.postList?.map((epost) => (
            <PostCard {...epost} />
          ))}
        </div>
      )}
    </div>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const workspace = context?.params?.workspace;
    const subspace = context?.params?.subspace;

    await fetchSSRQuery({
      action: serverFetchSubspace,
      ssrApolloQuery: ssrFetchSubspace.getServerPage,
      variables: {
        subspaceId: subspace || 'some',
      },
      dispatch: store.dispatch,
    });

    /*
    In case we want to do server side fetching of post lists.
     */

    // await fetchSSRQuery({
    //   action: serverFetchPostList,
    //   ssrApolloQuery: ssrFetchAllPostsFromSubspace.getServerPage,
    //   variables: {
    //     workspaceId: workspace || '',
    //     subspaceId: subspace || '',
    //   },
    //   dispatch: store.dispatch,
    // });

    return {
      props: { workspaceId: workspace, subspaceId: subspace },
    };
  }
);

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: true, //indicates the type of fallback
  };
};

SubspacePage.layoutType = 'general';

export default SubspacePage;
