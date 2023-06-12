import { gql } from '@apollo/client';

export const CREATE_QUIZ_MUTATION = gql`
  mutation createQuiz(
    $quizInput: QuizInput!
    $workspaceId: ID!
    $subspaceId: ID!
  ) {
    createQuiz(
      quizInput: $quizInput
      workspaceId: $workspaceId
      subspaceId: $subspaceId
    ) {
      id
      question
      workspaceId
      subspaceId
    }
  }
`;
