import { gql } from "@apollo/client";

export const WORKSPACE_FRAGMENT = gql`
  fragment WorkspaceFragment on Workspace {
    id
    description
    url
    ownerId
    name
    gradient
  }
`;

export const FETCH_WORKSPACE_QUERY = gql`
  ${WORKSPACE_FRAGMENT}
  query fetchWorkspaces($page: Int!, $limit: Int!) {
    fetchWorkspaces(page: $page, limit: $limit) {
      ...WorkspaceFragment
    }
  }
`;

