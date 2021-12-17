import { gql } from '@apollo/client';

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    comment
    isParent
    upvotes
    type
    commentVotes {
      type
      cid
    }
    user {
      firstname
      lastname
      id
      email
    }
  }
`;

export const FETCH_POST_QUERY = gql`
  ${COMMENT_FRAGMENT}
  query fetchCommentsByPost($postID: ID!) {
    fetchCommentsByPost(postID: $postID) {
      ...CommentFragment
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  ${COMMENT_FRAGMENT}
  mutation createComment($postID: ID!, $comment: String!, $commentType: CommentEnum!, $to: ID) {
    createComment(postID: $postID, comment: $comment, commentType: $commentType, to: $to) {
      ...CommentFragment
    }
  }
`;

export const UPVOTE_COMMENT_MUTATION = gql`
  ${COMMENT_FRAGMENT}
  mutation upvoteComment($commentID: ID!, $type: VoteEnum!) {
    upvoteComment(commentID: $commentID, type: $type) {
      ...CommentFragment
    }
  }
`;
