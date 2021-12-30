import { gql } from '@apollo/client';

export const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $type: String!, $body: String!) {
    createPost(title: $title, type: $type, body: $body) {
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
