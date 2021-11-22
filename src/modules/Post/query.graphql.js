import { gql } from '@apollo/client';

export const PostQuery = gql`
  mutation createPost($title: String!, $type: String!, $body: String!) {
    createPost(title: $title, type: $type, body: $body) {
      title
      type
      post_id
      content {
        body
        id
      }
    }
  }
`
