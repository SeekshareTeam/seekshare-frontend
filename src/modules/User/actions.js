import { makeQuery } from '../request/graphql-request.js';
import { UserQuery } from './query.graphql';

export const getUser = function(variables) {
  return makeQuery(UserQuery, variables);
};
