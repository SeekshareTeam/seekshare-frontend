import { gql } from '@apollo/client';

export const QUIZ_FRAGMENT = gql`
  fragment QuizFragment on Quiz {
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
    createdAt
  }
`;

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
      question {
        body
      }
      workspaceId
      subspaceId
    }
  }
`;

export const PUBLISH_WORKSHEET_MUTATION = gql`
  mutation publishWorksheet(
    $quizIds: [ID!]!
    $workspaceId: ID!
    $subspaceId: ID!
  ) {
    publishWorksheet(
      quizIds: $quizIds
      workspaceId: $workspaceId
      subspaceId: $subspaceId
    )
  }
`;

export const FETCH_WORKSHEET_MUTATION = gql`
  query fetchWorksheet($worksheetId: ID!) {
    fetchWorksheet(worksheetId: $worksheetId) {
      quizGroup
      quiz {
        ...QuizFragment
      }
    }
  }
  ${QUIZ_FRAGMENT}
`;

export const FETCH_QUIZZES_FROM_SUBSPACE_QUERY = gql`
  ${QUIZ_FRAGMENT}
  query fetchAllQuizzesFromSubspace($workspaceId: ID!, $subspaceId: ID!) {
    fetchAllQuizzesFromSubspace(
      workspaceId: $workspaceId
      subspaceId: $subspaceId
    ) {
      ...QuizFragment
    }
  }
`;
