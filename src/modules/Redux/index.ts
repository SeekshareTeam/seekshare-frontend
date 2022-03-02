import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import topicReducer from 'src/modules/Topic/slice';
import postReducer from 'src/modules/Post/slice';
import commentReducer from 'src/modules/Comment/slice';
import loadingReducer, { setLoading } from 'src/modules/App/slice';
import authReducer from 'src/modules/Auth/slice';
import workspaceReducer from 'src/modules/Workspace/slice';

import { isEmpty } from 'lodash';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      topics: topicReducer,
      post: postReducer,
      comments: commentReducer,
      app: loadingReducer,
      workspace: workspaceReducer,
    },
    // devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });
};

// export const store = configureStore({
//   reducer: {
//     topics: topicReducer,
//     post: postReducer,
//     comments: commentReducer,
//     app: loadingReducer,
//   },
// });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;

// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']; // .dispatch;

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

  console.log('@ loading', loading);
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
    dispatch(setLoading(loading));
  }, [loading]);
  React.useEffect(() => {
    if (onMount) {
      apolloQuery();
    }
  }, [onMount]);
  return apolloQuery;
};

export const fetchSSRQuery = async <
  A extends (...args: any) => any,
  T extends (...args: any) => any
>({
  action,
  ssrApolloQuery,
  variables,
  dispatch,
}: {
  action: A;
  ssrApolloQuery: T;
  variables: Parameters<T>['variables'] | undefined;
  dispatch: AppDispatch;
}) => {
  const result = await ssrApolloQuery({ variables });

  const dataKeys = Object.keys(result?.props?.data || {});

  if (!isEmpty(dataKeys) && result?.props?.data) {
    const { data } = result.props;
    dispatch(action(data[dataKeys[0]]));
  }
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
        dispatch(action(data[dataKeys[0]]));
      }
    }
  }, [data]);

  React.useEffect(() => {
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

export const wrapper = createWrapper<AppStore>(makeStore);
