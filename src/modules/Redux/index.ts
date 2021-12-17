import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import topicReducer from 'src/modules/Topic/slice';
import postReducer from 'src/modules/Post/slice';
import commentReducer from 'src/modules/Comment/slice';
import loadingReducer, { setLoading } from 'src/modules/App/slice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    topics: topicReducer,
    post: postReducer,
    comments: commentReducer,
    app: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCustomQuery = <
  A extends (...args: any) => any,
  T extends (...args: any) => any
>(
  action: A,
  useApolloQuery: T,
  variables: Parameters<T> | undefined,
  onMount = true
) => {
  const dispatch = useAppDispatch();
  const [apolloQuery, { data, loading, error }] = useApolloQuery({
    variables,
    fetchPolicy: 'no-cache',
  });
  if (error) {
    console.log(error);
  }
  React.useEffect(() => {
    if (data) {
      const dataKeys = Object.keys(data);
      // console.log('@ a', dataKeys, action);
      if (action) {
        dispatch(action(data[dataKeys[0]]));
      }

      // dispatch(action(data));
    }
  }, [data]);
  React.useEffect(() => {
    console.log('@@ load', loading);
    dispatch(setLoading(loading));
  }, [loading]);
  React.useEffect(() => {
    if (onMount) {
      apolloQuery();
    }
  }, [onMount]);
  return apolloQuery;
};

export const useCustomMutation = <
  A extends (...args: any) => any,
  T extends (...args: any) => any
>(
  action: A,
  useApolloMutation: T,
  variables: Parameters<T> | undefined,
  onMount = true
) => {
  const dispatch = useAppDispatch();
  const [apolloQuery, { data, loading, error }] = useApolloMutation({
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  });
  if (error) {
    console.log(error);
  }
  React.useEffect(() => {
    if (data) {
      const dataKeys = Object.keys(data);
      if (action) {
        console.log('d', data);
        console.log('k', data[dataKeys[0]]);
        dispatch(action(data[dataKeys[0]]));
      }
    }
  }, [data]);
  React.useEffect(() => {
    console.log('@@ mutation load', loading);
    dispatch(setLoading(loading));
  }, [loading]);

  React.useEffect(() => {
    if (onMount) {
      let params: { variables?: Parameters<T> | undefined } = {};
      if (variables) {
        params.variables = variables;
      }
      apolloQuery(params);
    }
  }, []);
  return apolloQuery;
};
