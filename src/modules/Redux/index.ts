import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import topicReducer from 'src/modules/Topic/slice';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { QueryVariablesUnion } from 'src/generated/operations';
import { QueryFunctionsUnion } from 'src/generated/apollo';

export const store = configureStore({
  reducer: {
    topics: topicReducer,
  },
});

export const useCustomQuery = (
  action,
  useApolloQuery: QueryFunctionsUnion,
  variables: undefined = undefined,
  onMount = true,
) => {
  console.log('in hereee');
  const dispatch = useDispatch();
  const [apolloQuery, { data, loading, error }] = useApolloQuery({ variables });
  React.useEffect(() => {
    if (data) {
      console.log('heeeere');
      dispatch(action(data));
    }
  }, [data]);
  React.useEffect(() => {
    if (onMount) {
      apolloQuery();
    }
  }, []);
  return apolloQuery;
};
