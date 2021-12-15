import * as React from 'react';
import { Title, PostTitle, CommentDetail } from 'src/components/Input';
import { CommentThread } from 'src/components/Comments';
import { MarkdownViewer } from 'src/components/Viewer';
import { useFetchPostLazyQuery } from 'src/generated/apollo';
import { useCustomQuery } from 'src/modules/Redux';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchCommentsByPost } from 'src/modules/Comment/slice';
import { useFetchCommentsByPostLazyQuery } from 'src/generated/apollo';
import { fetchPost } from 'src/modules/Post/slice';

import { Votes } from 'src/components/Post/votes';
import useCommentApi from 'src/components/Comments/api';

const classes = {
  postContainer: 'border-2 border-gray-500 flex flex-start flex-wrap w-2/3',
  contentInfo: 'w-full',
  title: 'w-full border-2 border-red-500 pl-2',
  votes: 'w-16 flex border-2 border-blue-500 pl-2',
  contentContainer: 'w-full flex flex-wrap',
  content: 'flex-1 p-2',
};

type PostContentType = {
  name: string;
  nameHref: string;
  votes: JSX.Element;
  content: JSX.Element;
};

const PostContent: JSX.Element = (props: ContentLayoutType) => {
  return (
    <div className={classes.contentContainer}>
      <div className={classes.votes}>{props.votes}</div>
      <div className={classes.content}>{props.content}</div>
    </div>
  );
};

type PostLayoutTypes = {
  title: string;
  contentLayout: JSX.Element;
};

const PostLayout: JSX.Element = (props) => {
  return (
    <div className={classes.postContainer}>
      <div className={classes.title}>{props.title}</div>
      {props.postContent}
      {props.commentThread}
      {/*<div className={classes.contentContainer}>
        <div className={classes.votes}>{props.votes}</div>
        <div className={classes.content}>{props.content}</div>
      </div>*/}
    </div>
  );
};

export const Post: JSX.Element = (props) => {
  /**
   * Make API calls in UseEffect function. Make post fetches here.
   */
  const commentApi = useCommentApi({ pid: props.pid });

  const fetchPostQuery = useCustomQuery<typeof useFetchPostLazyQuery>(
    fetchPost,
    useFetchPostLazyQuery,
    undefined,
    false
  );

  const fetchCommentsByPostQuery = useCustomQuery<
    typeof fetchCommentsByPost,
    typeof useFetchCommentsByPostLazyQuery
  >(fetchCommentsByPost, useFetchCommentsByPostLazyQuery, undefined, false);

  React.useEffect(() => {
    if (props.pid) {
      fetchPostQuery({ variables: { pid: props.pid } });
      fetchCommentsByPostQuery({ variables: { postID: props.pid } });
    }
  }, [props.pid]);

  const reduxState = useSelector((state) => {
    return {
      post: state.post.data,
      loading: state.app.loading,
    };
  }, shallowEqual);

  // if (reduxState.loading) {
  //   return <div>{'Loading...'}</div>;
  // }

  if (reduxState?.post?.content?.body) {
    return (
      <PostLayout
        title={
          <PostTitle
            name="Abhinav Bhandari"
            date="Today"
            href=""
            title={reduxState.post.title}
          />
        }
        postContent={
          <PostContent
            votes={<Votes size="medium" />}
            content={<MarkdownViewer text={reduxState.post.content.body} />}
          />
        }
        commentThread={
          <CommentThread pid={props.pid} commentApi={commentApi} />
        }
      />
    );
  }

  return <> </>;
};
