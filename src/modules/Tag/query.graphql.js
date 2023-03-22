import { gql } from '@apollo/client';
import  { TAG_FRAGMENT } from 'src/modules/Home/query.graphql';

export const QUERY_SEARCH_TAGS = gql`
  query searchTags(
    $subspaceId: ID
    $workspaceId: ID
    $queryString: String!
    $pageNumber: Int
  ) {
    searchTags(
      subspaceId: $subspaceId
      workspaceId: $workspaceId
      queryString: $queryString
      pageNumber: $pageNumber
    ) {
      ...TagFragment
    }
  }
  ${TAG_FRAGMENT}
`;

export const QUERY_SEARCH_EXACT_TAGS = gql`
  query searchExactTag(
    $subspaceId: ID
    $workspaceId: ID
    $queryString: String!
    $pageNumber: Int
  ) {
    searchExactTag(
      subspaceId: $subspaceId
      workspaceId: $workspaceId
      queryString: $queryString
      pageNumber: $pageNumber
    ) {
      ...TagFragment
    }
  }
  ${TAG_FRAGMENT}
`;

export const CREATE_TAG_MUTATION = gql`
  mutation createTag($input: TagInput!) {
    createTag(input: $input)
  }
`;

export const QUERY_ALL_TAGS = gql`
  query fetchSubspaceTags($workspaceId: ID!, $subspaceId: ID!) {
    fetchSubspaceTags(workspaceId: $workspaceId, subspaceId: $subspaceId) {
      ...TagFragment
    }
  }
  ${TAG_FRAGMENT}
`;
