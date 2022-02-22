import { gql } from "@apollo/client";

export const CREATE_WORKSPACE_MUTATION = gql`
  mutation createWorkspace($workspaceInput: WorkspaceInput!) {
    createWorkspace(workspaceInput: $workspaceInput) {
      id
      name
      description
    }
  }
`;
