import * as React from 'react';

import { createSubspace } from 'src/modules/Subspace/slice';

import { useCustomMutation } from 'src/modules/Redux';

import { useCreateSubspaceMutation } from 'src/generated/apollo';

const api = () => {
  // Use a pattern where if undefined then load it
  // otherwise return the value. jk
  const createSubspaceMutation = useCustomMutation<
    typeof createSubspace,
    typeof useCreateSubspaceMutation
  >(createSubspace, useCreateSubspaceMutation, undefined, false);

  console.log('@ see how many times this gets initialized');
  const onCreateSubspace = ({
    name,
    fieldTwo = null,
    fieldThree = null,
    fieldFour = null,
  }: {
    name: string;
    fieldTwo: string;
    fieldThree: string;
    fieldFour: string;
  }) => {
    await createSubspaceMutation({
      variables: { subspaceInput: { name, fieldTwo, fieldThree, fieldFour } },
    });
  };
};
