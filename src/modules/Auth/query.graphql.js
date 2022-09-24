import { gql } from '@apollo/client';

export const AUTH_USER = gql`
  fragment AuthUser on User {
    id
    firstname
    lastname
    email
    token
    avatar
  }
`;

export const AUTH_USER_QUERY = gql`
  query userAuthenticated {
    userAuthenticated {
      id
      firstname
      lastname
      email
      token
      currentWorkspace
      avatar
      userWorkspaces {
        url
        id
        currentSubspace
        name
        description
        userSubspaces {
          id
          name
          fieldTwo
          fieldThree
          fieldFour
          workspaceId
        }
      }
    }
  }
`;

export const SUBSCRIBE_SUBSPACE_MUTATION = gql`
  mutation subscribeSubspace($subspaceId: ID!, $workspaceId: ID!) {
    subscribeSubspace(subspaceId: $subspaceId, workspaceId: $workspaceId) {
      id
      name
      fieldTwo
      fieldThree
      fieldFour
      workspaceId
    }
  }
`;

export const UNSUBSCRIBE_SUBSPACE_MUTATION = gql`
  mutation unsubscribeSubspace($subspaceId: ID!) {
    unsubscribeSubspace(subspaceId: $subspaceId)
  }
`;
