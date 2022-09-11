import { gql } from "@apollo/client";
//
// export const UserQuery = gql`
//   query user {
//     user {
//       firstname
//       lastname
//       email
//     }
//   }
// `;
export const UserQuery = gql`
  query userLoginWithHash($email: String!, $toBeHash: String!) {
    userLoginWithHash(email: $email, toBeHash: $toBeHash) {
      firstname
      lastname
      id
      email
      token
    }
  }
`;

