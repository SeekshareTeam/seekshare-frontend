import { gql } from '@apollo/client';

export const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $type: String!, $body: String!) {
    createPost(title: $title, type: $type, body: $body) {
      title
      type
      post_id
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
      post_id
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
