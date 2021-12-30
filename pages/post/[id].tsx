import { useRouter } from 'next/router';
import { GeneralLayout } from 'src/components/Layouts';
import { ssrFetchPost } from 'src/generated/page';
import { wrapper, fetchSSRQuery } from 'src/modules/Redux';
import { serverFetchPost } from 'src/modules/Post/slice';
import { useSession } from 'next-auth/react';

import { Post } from 'src/components/Post';

const PostPage = (props) => {
  const router = useRouter();
  const session = useSession();

  console.log('@ postpage', session);

  return (
    <div className="flex justify-center flex-1 items-start">
      <Post pid={props.id} />
    </div>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    /**
     * What is your goal. What do you want to do?
     * We are aiming to build something along the lines of.
     * What do we want to build. We want to do this.
     *
     */

    await fetchSSRQuery({
      action: serverFetchPost,
      ssrApolloQuery: ssrFetchPost.getServerPage,
      variables: { pid: context.params.id },
      dispatch: store.dispatch,
    })

    // const result = await ssrFetchPost.getServerPage({
    //   variables: { pid: context.params.id },
    // });

    // store.dispatch(serverFetchPost(result.props.data.fetchPost))

    return {
      props: { id: context.params.id },
    };
  }
);

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: true, //indicates the type of fallback
  };
};

PostPage.getLayout = GeneralLayout;

export default PostPage;
