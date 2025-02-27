import * as React from 'react';
import { UnderlineTabs } from 'src/components/Tabs';
import { PostCard } from 'src/components/Post/card';
import { wrapper, fetchSSRQuery } from 'src/modules/Redux';
import { fetchPostList } from 'src/modules/PostList/slice';
import { serverFetchSubspace } from 'src/modules/Subspace/slice';
import { serverFetchWorkspace } from 'src/modules/Workspace/slice';
import { Button } from 'src/components/Button';
import { ssrFetchSubspace, ssrFetchWorkspace } from 'src/generated/page';
import { useFetchAllPostsFromSubspaceLazyQuery } from 'src/generated/apollo';
import { useAppSelector, useCustomQuery } from 'src/modules/Redux';
import { upperCase, isEmpty } from 'lodash';
import { useSubspaceApi } from 'src/api/context';
import Head from 'next/head';
import { NextPage } from 'next';
import QuizFlexTable from 'src/sections/user/Dashboard/QuizFlexGrid';
import WorksheetFlexTable from 'src/sections/user/Dashboard/WorksheetFlexGrid';
import DashboardOptionsButton from 'src/sections/subspace/Options/Dashbaord';

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
          <div className="w-24 h-24 z-20 justify-self-start rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 shadow relative ml-4 md:ml-24">
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

const subspaceTabs = [
  { tabValue: 'Worksheets', tabKey: 'worksheets' },
  // { tabValue: 'Question Bank', tabKey: 'quizzes' },
  // { tabValue: 'Posts', tabKey: 'posts' },
  // { tabValue: 'Q + A', tabKey: 'q_+_a' },
];

const SubspacePage: PageWithLayout<SubspacePageProps> = (props) => {
  const [tabs, setTabs] = React.useState(subspaceTabs);

  const [selectedTab, setSelectedTab] = React.useState('worksheets');

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

  const reduxState = useAppSelector((state) => {
    const subspaceInstance = state?.auth?.data?.userWorkspaces
      ?.find((uw) => {
        return uw.id === props.workspaceId;
      })
      ?.userSubspaces?.find((us) => us.id === props.subspaceId);

    return {
      auth: state.auth?.data,
      postList: state.postList?.client,
      subspace: state.subspace?.server,
      quizzes: state.subspace?.quizzes,
      userRelation: {
        isJoined: !isEmpty(subspaceInstance) ? true : false,
        accessRole: subspaceInstance?.userPermission,
      },
    };
  });

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
          break;
        case 'quizzes':
          (async () => {
            await subspaceApi.fetchAllQuizzesFromSubspace({
              variables: {
                workspaceId: props.workspaceId,
                subspaceId: props.subspaceId,
              },
            });
          })();
          break;
        case 'worksheets':
          (async () => {
            await subspaceApi.fetchWorksheetsBySubspace({
              variables: { subspaceId: props.subspaceId },
            });
          })();
          break;
        default:
      }
    }
  }, [selectedTab, props.subspaceId, props.workspaceId]);

  React.useEffect(() => {
    if (reduxState.userRelation.isJoined) {
      const visibleTabs = reduxState?.userRelation?.accessRole?.filter(
        (docAccess) => {
          if (docAccess.role !== 'noaccess') {
            return true;
          }
        }
      );

      const newTabs = visibleTabs
        ?.map((vt) => {
          return subspaceTabs.find((st) => st.tabKey === vt.type);
        })
        .filter((x) => x !== undefined) as {
        tabValue: string;
        tabKey: string;
      }[];

      if (newTabs) {
        setTabs(newTabs);
      }
    }
  }, [reduxState.userRelation.accessRole, reduxState.userRelation.isJoined]);

  const onTabClick = (tabKey: string) => {
    setSelectedTab(tabKey);
  };

  const onSubscribe = async () => {
    if (!reduxState.userRelation?.isJoined) {
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
              {reduxState?.userRelation?.isJoined
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
      itemsToDisplay={<ItemsToDisplay type={selectedTab} />}
      addButton={
        <DashboardOptionsButton
          workspaceId={props.workspaceId}
          subspaceId={props.subspaceId}
        />
      }
    />
  );
};

const ItemsToDisplay: React.FC<{ type: string }> = (props) => {
  const reduxState = useAppSelector((state) => ({
    postList: state.postList?.client,
    quizzes: state.subspace?.quizzes,
    worksheetItems: state.subspace?.worksheetItems,
  }));

  switch (props.type) {
    case 'posts':
      return (
        <div className="flex flex-col items-center flex-1 overflow-y-scroll">
          {reduxState?.postList?.map((epost, i) => (
            <PostCard key={i} {...epost} />
          ))}
        </div>
      );
    case 'quizzes':
      return <QuizFlexTable quizzes={reduxState?.quizzes} />;
    case 'worksheets':
      return <WorksheetFlexTable worksheetItems={reduxState?.worksheetItems} />;
  }
  return null;
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
