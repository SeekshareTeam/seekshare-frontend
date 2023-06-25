import { gql } from '@apollo/client';

import { SUBSPACE_FRAGMENT } from './query.graphql.js';

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
    $title: String!
    $workspaceId: ID!
    $subspaceId: ID!
  ) {
    publishWorksheet(
      quizIds: $quizIds
      title: $title
      workspaceId: $workspaceId
      subspaceId: $subspaceId
    ) {
      quizGroup
      quiz {
        ...QuizFragment
      }
    }
  }
`;

export const FETCH_WORKSHEET_QUERY = gql`
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

export const FETCH_WORKSHEET_BY_SUBSPACE_QUERY = gql`
  query fetchWorksheetsBySubspace($subspaceId: ID!) {
    fetchWorksheetsBySubspace(subspaceId: $subspaceId) {
      id
      title
      createdAt
      quizCount
      subspace {
        ...SubspaceFragment
      }
    }
  }
  ${SUBSPACE_FRAGMENT}
`;
