import * as React from 'react';
import { Title, PostTitle } from 'src/components/Input';
import { MarkdownViewer } from 'src/components/Viewer';
import { useFetchPostLazyQuery } from 'src/generated/apollo';
import { useCustomQuery } from 'src/modules/Redux';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchPost } from 'src/modules/Post/slice';

import { Votes } from 'src/components/Post/votes';

const classes = {
  postContainer: 'border-2 border-gray-500 flex flex-start flex-wrap w-2/3',
  title: 'w-full border-2 border-red-500 pl-2',
  votes: 'w-16 flex border-2 border-blue-500 pl-2',
  contentContainer: 'w-full flex',
  content: 'flex-1 p-2',
};

const PostLayout: JSX.Element = (props) => {
  return (
    <div className={classes.postContainer}>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.contentContainer}>
        <div className={classes.votes}>{props.votes}</div>
        <div className={classes.content}>{props.content}</div>
      </div>
    </div>
  );
};

export const Post: JSX.Element = (props) => {
  /**
   * Make API calls in UseEffect function. Make post fetches here.
   */
  const fetchPostQuery = useCustomQuery<typeof useFetchPostLazyQuery>(
    fetchPost,
    useFetchPostLazyQuery,
    undefined,
    false
  );

  React.useEffect(() => {
    if (props.pid) {
      fetchPostQuery({ variables: { pid: props.pid } });
    }
  }, [props.pid]);

  const reduxState = useSelector((state) => {
    return {
      post: state.post.data,
      loading: state.app.loading,
    };
  }, shallowEqual);

  if (reduxState.loading) {
    return <div>{'Loading...'}</div>;
  }

  if (reduxState?.post?.content?.body) {
    return (
      <PostLayout
        votes={<Votes size="medium" />}
        title={<PostTitle name="Abhinav Bhandari" date="Today" href="" title={reduxState.post.title} />}
        // title={<Title value={reduxState.post.title} />}
        content={<MarkdownViewer text={reduxState.post.content.body} />}
      />
    );
  }

  return <> </>;
};
