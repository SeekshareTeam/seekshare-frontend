import { gql } from '@apollo/client';

export const CREATE_QUIZ_MUTATION = gql`
  mutation createQuiz($quizInput: QuizInput!) {
    createQuiz(quizInput: $quizInput)
  }
`;
