import { gql } from "@apollo/client";

export const TopicQuery = gql`
  query subjects {
    subjects {
      code
      digit
      name
    }
  }
`;
