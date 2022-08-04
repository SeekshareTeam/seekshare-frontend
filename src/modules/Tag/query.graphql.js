import { gql } from '@apollo/client';

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
      id
      workspaceId
      subspaceId
      value
      description
    }
  }
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
      id
      workspaceId
      subspaceId
      value
      description
    }
  }
`;

export const CREATE_TAG_MUTATION = gql`
  mutation createTag($workspaceId: ID!, $subspaceId: ID!, $value: String!, $description: String) {
    createTag(workspaceId: $workspaceId, subspaceId: $subspaceId, value: $value, description: $description)
  }
`;

export const QUERY_ALL_TAGS = gql`
  query fetchSubspaceTags($workspaceId: ID!, $subspaceId: ID!) {
    fetchSubspaceTags(workspaceId: $workspaceId, subspaceId: $subspaceId) {
      id
      workspaceId
      subspaceId
      value
      description
    }
  }
`;
