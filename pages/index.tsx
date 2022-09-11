import React from 'react';

import Card from 'src/components/Card';

import { PageWithLayout } from 'src/utils/types';
import { wrapper, fetchSSRQuery } from 'src/modules/Redux';
import { serverFetchWorkspaces } from 'src/modules/Home/slice';
import { ssrFetchWorkspaces } from 'src/generated/page';
import { useAppSelector } from 'src/modules/Redux';
import { shallowEqual } from 'react-redux';

interface HomeLayoutProps {
  workspaceCards?: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = (props) => {
  return <div className="flex flex-row flex-wrap px-4">{props.workspaceCards}</div>;
};

const Home: PageWithLayout<{}> = () => {
  const reduxState = useAppSelector((state) => ({
    workspaces: state.home?.workspaces,
    workspace: state.workspace
  }), shallowEqual);
  // const reduxState = useShallowSelector((state) => ({
  //   workspaces: state.home?.workspaces,
  // }));

  return (
    <HomeLayout
      workspaceCards={reduxState?.workspaces?.map((w) => (
        <Card
          pageUrl={`/workspace/${w.id}`}
          imgUrl={w?.url}
          title={w.name}
          description={w?.description}
          gradient={w?.gradient}
        />
      ))}
    />
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await fetchSSRQuery({
    action: serverFetchWorkspaces,
    ssrApolloQuery: ssrFetchWorkspaces.getServerPage,
    variables: {
      page: 0,
      limit: 10,
    },
    dispatch: store.dispatch,
  });

  return { props: {} };
});

Home.layoutType = 'general';

export default Home;
