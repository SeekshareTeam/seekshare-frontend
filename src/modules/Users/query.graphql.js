import { gql } from '@apollo/client';

export const FETCH_USER_BY_WORKSPACE = gql`
  query fetchUsersByWorkspace($workspaceId: ID!, $page: Int!, $limit: Int!) {
    fetchUsersByWorkspace(
      workspaceId: $workspaceId
      page: $page
      limit: $limit
    ) {
      id
      firstname
      lastname
      avatar
      userPermissions {
        wid
        permission
      }
    }
  }
`;
