import * as React from 'react';
import { UnderlineTabs } from 'src/components/Tabs';
import { PostCard } from 'src/components/Post/card';
import AddButton from 'src/components/Subspace/AddButton';
import { wrapper, fetchSSRQuery } from 'src/modules/Redux';
import { fetchPostList } from 'src/modules/PostList/slice';
import { serverFetchSubspace } from 'src/modules/Subspace/slice';
import { serverFetchWorkspace } from 'src/modules/Workspace/slice';
import { Button } from 'src/components/Button';
import { ssrFetchSubspace, ssrFetchWorkspace } from 'src/generated/page';
import { useFetchAllPostsFromSubspaceLazyQuery } from 'src/generated/apollo';
import { useAppSelector, useCustomQuery } from 'src/modules/Redux';
import { shallowEqual } from 'react-redux';
import { upperCase } from 'lodash';
import { useSubspaceApi } from 'src/api/context';
import Head from 'next/head';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

type PageWithLayout<T> = NextPage<T> & { layoutType: string };

interface SubspacePageProps {
  workspaceId: string;
  subspaceId: string;
}

interface SubspaceLayoutProps {
  title: React.ReactNode;
  button: React.ReactNode;
  underlineTabs: React.ReactNode;
  itemsToDisplay: React.ReactNode;
  addButton: React.ReactNode;
}

const SubspaceLayout: React.FC<SubspaceLayoutProps> = (props) => {
  return (
    <div className="flex flex-col flex-1 relative overflow-hidden">
      <Head>
        <title>Subspace</title>
      </Head>
      <div className="flex w-full flex-wrap bg-nord-4 dark:bg-nord-1 pt-4">
        <div className="flex justify-start flex-1">
          <div className="w-24 h-24 justify-self-start rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 shadow relative ml-24">
            <div className="absolute bottom-0 left-0 px-2 py-0.5 text-nord-0 dark:text-nord-6 shadow-sm font-medium text-3xl rounded-md translate-x-12 translate-y-2 transform bg-nord-4 dark:bg-nord-1 whitespace-nowrap">
              {props.title}
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-end mr-4">{props.button}</div>
      </div>
      {props.underlineTabs}
      {props.itemsToDisplay}
      <div className="absolute bottom-0 right-0 m-6">{props.addButton}</div>
    </div>
  );
};

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
  const [onSubscribeSubspace, onSubscribeSubspaceState] =
    subspaceApi.subscribeSubspaceMutation;
  const [onUnsubscribeSubspace] = subspaceApi.unsubscribeSubspaceMutation;

  const router = useRouter();

  React.useEffect(() => {
    if (selectedTab && props.workspaceId && props.subspaceId) {
      switch (selectedTab) {
        case 'posts':
          useFetchAllPostsFromSubspace({
            variables: {
              workspaceId: props.workspaceId,
              subspaceId: props.subspaceId,
            },
          });
          break
        default:
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

  const onCreatePost = async () => {
    router.push(
      {
        pathname: '/create',
        query: { subspaceId: props.subspaceId, workspaceId: props.workspaceId },
      },
      '/create'
    );
  };

  const onSubscribe = async () => {
    if (!reduxState?.hasSubspace) {
      if (onSubscribeSubspace) {
        await onSubscribeSubspace({
          variables: {
            workspaceId: props.workspaceId,
            subspaceId: props.subspaceId,
          },
        });
      }
    } else {
      if (onUnsubscribeSubspace) {
        await onUnsubscribeSubspace({
          variables: {
            subspaceId: props.subspaceId,
          },
        });
      }
    }
  };

  return (
    <SubspaceLayout
      title={<h2>{reduxState?.subspace?.name || 'Loading...'}</h2>}
      button={
        <>
          {reduxState?.subspace?.name && reduxState?.auth && (
            <Button
              variant="primary"
              radius="large"
              size="large"
              loading={onSubscribeSubspaceState.loading}
              onClick={onSubscribe}
              className="self-center shadow"
            >
              {reduxState?.hasSubspace
                ? `LEAVE ${upperCase(reduxState.subspace.name)}`
                : `JOIN ${upperCase(reduxState.subspace.name)}`}
            </Button>
          )}
        </>
      }
      underlineTabs={
        <UnderlineTabs
          tabs={tabs}
          onSelectTab={onTabClick}
          active={selectedTab}
        />
      }
      itemsToDisplay={
        selectedTab === 'posts' && (
          <div className="flex flex-col items-center flex-1 overflow-y-scroll">
            {reduxState?.postList?.map((epost, i) => (
              <PostCard key={i} {...epost} />
            ))}
          </div>
        )
      }
      addButton={<AddButton onClick={onCreatePost} />}
    />
  );
};

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const workspace = context?.params?.workspace;
    const subspace = context?.params?.subspace;

    // Might want to add a condition here that makes the fetching
    // of workspace conditional

    // if (store.getState().server.workspace.id === workspace) {
    // }

    await fetchSSRQuery({
      action: serverFetchWorkspace,
      ssrApolloQuery: ssrFetchWorkspace.getServerPage,
      variables: {
        workspaceId: workspace || 'some',
      },
      dispatch: store.dispatch,
    });

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
