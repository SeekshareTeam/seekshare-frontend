import { gql } from '@apollo/client';

export const AUTH_USER = gql`
  fragment AuthUser on User {
    id
    firstname
    lastname
    email
    token
  }
`;

export const AUTH_USER_QUERY = gql`
  query userAuthenticated {
    userAuthenticated {
      firstname
      lastname
      id
      email
      token
    }
  }
`
