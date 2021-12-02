import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import topicReducer from 'src/modules/Topic/slice';
import postReducer from 'src/modules/Post/slice';
import loadingReducer, { setLoading } from 'src/modules/App/slice';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { QueryVariablesUnion } from 'src/generated/operations';
import { QueryFunctionsUnion } from 'src/generated/apollo';

export const store = configureStore({
  reducer: {
    topics: topicReducer,
    post: postReducer,
    app: loadingReducer,
  },
});

export const useCustomQuery = <A, T>(
  action: A | undefined,
  useApolloQuery: T,
  variables: Parameters<T> | undefined,
  onMount = true
) => {
  const dispatch = useDispatch();
  const [apolloQuery, { data, loading, error }] = useApolloQuery({ variables });
  React.useEffect(() => {
    if (data) {
      const dataKeys = Object.keys(data);
      console.log('@ a', action);
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

export const useCustomMutation = <A, T>(
  action: A | undefined,
  useApolloMutation: T,
  variables: Parameters<T> | undefined,
  onMount = true
) => {
  const dispatch = useDispatch();
  const [apolloQuery, { data, loading, error }] = useApolloMutation();
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
      let params = {};
      if (variables) {
        params.variables = variables;
      }
      apolloQuery(params);
    }
  }, []);
  return apolloQuery;
};
