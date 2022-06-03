import { gql } from "@apollo/client";

export const WORKSPACE_FRAGMENT = gql`
  fragment WorkspaceFragment on Workspace {
    id
    description
    url
    ownerId
    name
  }
`

export const CREATE_WORKSPACE_MUTATION = gql`
  mutation createWorkspace($workspaceInput: WorkspaceInput!) {
    createWorkspace(workspaceInput: $workspaceInput) {
      id
      name
      description
    }
  }
`;
