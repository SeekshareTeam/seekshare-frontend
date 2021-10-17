import { makeQuery } from '../request/graphql-request.js';
import { TopicQuery } from './query.graphql';

export const getTopics = function(variables) {
  return makeQuery(TopicQuery, variables);
};
