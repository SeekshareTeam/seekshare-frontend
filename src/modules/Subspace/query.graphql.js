import { gql } from "@apollo/client";

export const CREATE_SUBSPACE_MUTATION = gql`
  mutation createSubspace($subspaceInput: SubspaceInput!) {
    createSubspace(subspaceInput: $subspaceInput)
  }
`;

export const SEARCH_SUBSPACE_QUERY = gql`
  query searchSubspaces($searchInput: SubspaceSearchInput!) {
    searchSubspaces(searchInput: $searchInput) {
      id
      name
      fieldTwo
      fieldThree
      fieldFour
      workspaceId
    }
  }
`;

export const FETCH_SUBSPACE_QUERY = gql`
  query fetchSubspace($subspaceId: ID!) {
    fetchSubspace(subspaceId: $subspaceId) {
      id
      name
      fieldTwo
      fieldThree
      fieldFour
      workspaceId
    }
  }
`

export const SUBSCRIBE_SUBSPACE_MUTATION = gql`
  mutation subscribeSubspace($subspaceId: ID!, $workspaceId: ID!) {
    subscribeSubspace(subspaceId: $subspaceId, workspaceId: $workspaceId)
  }
`

export const UNSUBSCRIBE_SUBSPACE_MUTATION = gql`
  mutation unsubscribeSubspace($subspaceId: ID!) {
    unsubscribeSubspace(subspaceId: $subspaceId)
  }
`;
