import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import topicReducer from 'src/modules/Topic/slice';
import postReducer from 'src/modules/Post/slice';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { QueryVariablesUnion } from 'src/generated/operations';
import { QueryFunctionsUnion } from 'src/generated/apollo';

export const store = configureStore({
  reducer: {
    topics: topicReducer,
    post: postReducer,
  },
});

export const useCustomQuery = <T>(
  action,
  useApolloQuery: T,
  variables: Parameters<T> | undefined,
  onMount = true,
) => {
  const dispatch = useDispatch();
  const [apolloQuery, { data, loading, error }] = useApolloQuery();
  React.useEffect(() => {
    if (data) {
      dispatch(action(data));
    }
  }, [data]);
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
