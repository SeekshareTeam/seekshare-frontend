import { gql } from '@apollo/client';

export const WORKSPACE_FRAGMENT = gql`
  fragment WorkspaceFragment on Workspace {
    id
    description
    url
    ownerId
    name
    gradient
    backgroundImage
    permissionTypes {
      id
      type
      text
    }
  }
`;

export const TAG_FRAGMENT = gql`
  fragment TagFragment on Tag {
    id
    value
    workspaceId
    subspaceId
    description
    colorString
    createdBy
    status
    createdAt
    updatedAt
  }
`;

export const SUBSPACE_FRAGMENT = gql`
  fragment SubspaceFragment on Subspace {
    id
    name
    fieldTwo
    fieldThree
    fieldFour
    workspaceId
    logoUrl
    logoType
    tags {
      ...TagFragment
    }
  }
  ${TAG_FRAGMENT}
`;

export const PUBLIC_USER_FRAGMENT = gql`
  fragment PublicUserFragment on User {
    id
    firstname
    lastname
    email
    alias
    fullname
    avatar
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
