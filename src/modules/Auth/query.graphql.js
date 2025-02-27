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
      fullname
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
          userPermission {
            type
            role
          }
        }
      }
      permissions {
        id
        type
        accessLevel
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

export const FETCH_POSTS_BY_USER_QUERY = gql`
  query fetchPostsByUser($workspaceId: ID!) {
    fetchPostsByUser(workspaceId: $workspaceId) {
      type
      posts {
        postId
        user {
          id
          firstname
          lastname
        }
        title
        createdAt
        tags {
          id
          colorString
          value
          description
          workspaceId
          subspaceId
          createdBy
          createdAt
          updatedAt
          status
        }
      }
      quizzes {
        id
        type
        question {
          body
        }
        optionKeys {
          id
          content {
            body
          }
        }
        subspace {
          name
          fieldTwo
          workspaceId
          id
        }
        quizTags {
          id
          value
          colorString
        }
      }
    }
  }
`;

export const UNSUBSCRIBE_SUBSPACE_MUTATION = gql`
  mutation unsubscribeSubspace($subspaceId: ID!) {
    unsubscribeSubspace(subspaceId: $subspaceId)
  }
`;
