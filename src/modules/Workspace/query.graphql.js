import { gql } from '@apollo/client';
import { WORKSPACE_FRAGMENT } from 'src/modules/Home/query.graphql';


// export const WORKSPACE_FRAGMENT = gql`
//   fragment WorkspaceFragment on Workspace {
//     id
//     description
//     url
//     ownerId
//     name
//   }
// `;

export const CREATE_WORKSPACE_MUTATION = gql`
  mutation createWorkspace($workspaceInput: WorkspaceInput!) {
    createWorkspace(workspaceInput: $workspaceInput) {
      id
      name
      description
      url
    }
  }
`;

export const FETCH_WORKSPACE_QUERY = gql`
  query fetchWorkspace($workspaceId: ID!) {
    fetchWorkspace(workspaceId: $workspaceId) {
      ...WorkspaceFragment
    }
  }
  ${WORKSPACE_FRAGMENT}
`;

export const FETCH_SUBSPACES_QUERY = gql`
  query fetchSubspaces($workspaceId: ID!, $pageNumber: Int!) {
    fetchSubspaces(workspaceId: $workspaceId, pageNumber: $pageNumber) {
      id
      name
      fieldTwo
      fieldThree
      fieldFour
      workspaceId
    }
  }
`;
