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
