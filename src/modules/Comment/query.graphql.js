import { gql } from '@apollo/client';

export const FETCH_POST_QUERY = gql`
  query fetchCommentsByPost($postID: ID!) {
    fetchCommentsByPost(postID: $postID) {
      isParent
      comment
      upvotes
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
mutation createComment($postID: ID!, $comment: String!, $to: ID) {
  createComment(postID: $postID, comment: $comment, to: $to)
}
`;
