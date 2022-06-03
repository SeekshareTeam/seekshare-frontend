import { gql } from "@apollo/client";
import { WORKSPACE_FRAGMENT } from 'src/modules/Workspace/query.graphql';

export const FETCH_WORKSPACE_QUERY = gql`
  query fetchWorkspaces($page: Int!, $limit: Int!) {
    fetchWorkspaces(page: $page, limit: $limit) {
      ...WorkspaceFragment
    }
  }
  ${WORKSPACE_FRAGMENT}
`;

