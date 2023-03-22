import { gql } from '@apollo/client';

import { SUBSPACE_FRAGMENT } from 'src/modules/Home/query.graphql';

export const CREATE_SUBSPACE_MUTATION = gql`
  mutation createSubspace($subspaceInput: SubspaceInput!) {
    createSubspace(subspaceInput: $subspaceInput)
  }
`;

export const SEARCH_SUBSPACE_QUERY = gql`
  query searchSubspaces($searchInput: SubspaceSearchInput!) {
    searchSubspaces(searchInput: $searchInput) {
      ...SubspaceFragment
    }
  }
  ${SUBSPACE_FRAGMENT}
`;

export const FETCH_SUBSPACE_QUERY = gql`
  query fetchSubspace($subspaceId: ID!) {
    fetchSubspace(subspaceId: $subspaceId) {
      ...SubspaceFragment
    }
  }
  ${SUBSPACE_FRAGMENT}
`;

export const SEARCH_IN_SUBSPACE_QUERY = gql`
  query searchInSubspace($searchInput: SubspaceSearchInput!) {
    searchInSubspace(searchInput: $searchInput) {
      ...SubspaceFragment
      id
      name
      fieldTwo
      fieldThree
      fieldFour
      workspaceId
    }
  }
  ${SUBSPACE_FRAGMENT}
`;
