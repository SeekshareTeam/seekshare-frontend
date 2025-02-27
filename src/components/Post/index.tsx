import * as React from 'react';
import { shallowEqual } from 'react-redux';
import { keyBy } from 'lodash';

import { PostTitle } from 'src/components/Input';
import { CommentThread } from 'src/components/Comments';
import Viewer, { Props as ViewerProps } from 'src/plugins/components/Viewer';
import { useCustomQuery, useAppSelector } from 'src/modules/Redux';

import { fetchCommentsByPost } from 'src/modules/Comment/slice';
import { useFetchCommentsByPostLazyQuery } from 'src/generated/apollo';
import { Component } from 'src/generated/types';

import { Votes } from 'src/components/Post/votes';
import useCommentApi from 'src/components/Comments/api';

const classes = {
  postContainer: 'flex flex-start flex-wrap w-2/3',
  contentInfo: 'w-full',
  title: 'w-full pl-2',
  votes: 'w-16 flex pl-2',
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
      <div className="flex shadow-lg flex-start flex-wrap w-full border border-gray-500 rounded">
        <div className={classes.title}>{props.title}</div>
        {props.postContent}
      </div>
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

  const fetchCommentsByPostQuery = useCustomQuery<
    typeof fetchCommentsByPost,
    typeof useFetchCommentsByPostLazyQuery
  >(fetchCommentsByPost, useFetchCommentsByPostLazyQuery, undefined, false);

  React.useEffect(() => {
    if (props.pid) {
      fetchCommentsByPostQuery({ variables: { postID: props.pid } });
    }
  }, [props.pid]);

  const reduxState = useAppSelector(state => {
    return {
      post: state?.post?.data,
      loading: state?.app?.loading,
    };
  }, shallowEqual);

  if (
    reduxState?.post?.content?.[0]?.body &&
    reduxState?.post?.title &&
    reduxState?.post?.user
  ) {
    let savedComponents: ViewerProps['savedComponents'] = undefined;
    const nonNullComponents: Component[] = [];
    reduxState.post.content.forEach(content => {
      if (content?.components && content?.components != null) {
        content.components.forEach(c => {
          if (c !== null) {
            nonNullComponents.push(c as Component);
          }
        });
      }
    });

    savedComponents = (keyBy(nonNullComponents, 'id') ||
      undefined) as ViewerProps['savedComponents'];

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
            content={
              <Viewer
                // TODO: change behavior based on type of post
                text={reduxState.post.content.reduce((acc, content) => {
                  return content?.body ? `${acc}\n\n${content.body}` : acc;
                }, '')}
                savedComponents={savedComponents}
                mode="read"
              />
            }
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
