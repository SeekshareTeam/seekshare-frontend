import { gql } from "@apollo/client";
import { PUBLIC_USER_FRAGMENT} from 'src/modules/Home';

export const USER_SIGN_UP = gql`
  mutation userSignUp($userInput: UserInput!) {
    userSignUp(userInput: $userInput)
  }
`

export const FETCH_USER_BY_ALIAS_QUERY = gql`
  query fetchUserByAlias($alias: String!) {
    fetchUserByAlias(alias: $alias) {
      ...PublicUserFragment
    }
  }
  ${PUBLIC_USER_FRAGMENT}
`
