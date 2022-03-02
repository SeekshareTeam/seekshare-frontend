import { gql } from "@apollo/client";

export const CREATE_SUBSPACE_MUTATION = gql`
  mutation createSubspace($subspaceInput: SubspaceInput!) {
    createSubspace(subspaceInput: $subspaceInput) {
      id
    }
  }
`;
