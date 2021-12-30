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
    commentAnswers {
      uid
      pid
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
      childComments {
        ...CommentFragment
        childComments {
          ...CommentFragment
        }
      }
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  ${COMMENT_FRAGMENT}
  mutation createComment($postID: ID!, $comment: String!, $commentType: CommentEnum!, $parentCommentId: ID) {
    createComment(postID: $postID, comment: $comment, commentType: $commentType, parentCommentId: $parentCommentId) {
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

export const SELECT_ANSWER_MUTATION = gql`
  ${COMMENT_FRAGMENT}
  mutation selectAnswer($commentID: ID!) {
    selectAnswer(commentID: $commentID) {
      ...CommentFragment
    }
  }
`;
