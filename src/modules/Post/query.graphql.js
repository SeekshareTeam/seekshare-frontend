import { gql } from '@apollo/client';

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    postId
    title
    type
    content {
      id
      body
      components {
        id
        type
        code
      }
    }
    user {
      id
      firstname
      lastname
      email
    }
    commentCount
    tags {
      id
      value
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($postInput: PostInput!) {
    createPost(postInput: $postInput) {
      title
      type
      postId
      content {
        body
        id
      }
      user {
        id
        firstname
        lastname
        email
      }
    }
  }
`;

export const FETCH_POST_MUTATION = gql`
  query fetchPost($pid: ID!) {
    fetchPost(pid: $pid) {
      title
      type
      postId
      content {
        id
        body
        components {
          id
          type
          code
        }
      }
      user {
        id
        firstname
        lastname
        email
      }
    }
  }
`;

export const FETCH_POSTS_FROM_SUBSPACE_QUERY = gql`
  ${POST_FRAGMENT}
  query fetchAllPostsFromSubspace($workspaceId: ID!, $subspaceId: ID!) {
    fetchAllPostsFromSubspace(
      workspaceId: $workspaceId
      subspaceId: $subspaceId
    ) {
      ...PostFragment
    }
  }
`;
