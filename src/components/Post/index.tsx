import * as React from 'react';
import { PostTitle } from 'src/components/Input';
import { CommentThread } from 'src/components/Comments';
import { MarkdownViewer } from 'src/components/Viewer';
import { useFetchPostLazyQuery } from 'src/generated/apollo';
import { useAppSelector, useCustomQuery } from 'src/modules/Redux';
import { shallowEqual } from 'react-redux';

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

type PostContentProps = {
  name?: string;
  nameHref?: string;
  votes: JSX.Element;
  content: JSX.Element;
};

const PostContent: React.FC<PostContentProps> = (props: PostContentProps) => {
  return (
    <div className={classes.contentContainer}>
      <div className={classes.votes}>{props.votes}</div>
      <div className={classes.content}>{props.content}</div>
    </div>
  );
};

type PostLayoutTypes = {
  title: JSX.Element;
  commentThread: JSX.Element;
  postContent: JSX.Element;
};

const PostLayout: React.FC<PostLayoutTypes> = (props: PostLayoutTypes) => {
  return (
    <div className={classes.postContainer}>
      <div className={classes.title}>{props.title}</div>
      {props.postContent}
      {props.commentThread}
    </div>
  );
};

type PostProps = {
  pid: string;
};

export const Post: React.FC<PostProps> = (props: PostProps) => {
  /**
   * Make API calls in UseEffect function. Make post fetches here.
   */
  const commentApi = useCommentApi({ pid: props.pid });

  const fetchPostQuery = useCustomQuery<
    typeof fetchPost,
    typeof useFetchPostLazyQuery
  >(fetchPost, useFetchPostLazyQuery, undefined, false);

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

  const reduxState = useAppSelector((state) => {
    return {
      post: state?.post?.data,
      loading: state?.app?.loading,
    };
  }, shallowEqual);

  if (reduxState?.post) {
    console.log("reduxState ", reduxState);
  }


  // reduxState.post.user.firstname + ' ' + reduxState.post.user.lastname
  //

  // if (reduxState.loading) {
  //   return <div>{'Loading...'}</div>;
  // }

  if (
    reduxState?.post?.content?.body &&
    reduxState?.post?.title &&
    reduxState?.post?.user
  ) {
    return (
      <PostLayout
        title={
          <PostTitle
            name={`${reduxState.post.user.firstname} ${reduxState.post.user.lastname}`}
            date="Today"
            href={`/user/${reduxState.post.user.id}`}
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
