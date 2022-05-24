import { createSubspace } from 'src/modules/Subspace/slice';
import { subscribeSubspace, unsubscribeSubspace } from 'src/modules/Auth/slice';

import { useCustomMutation } from 'src/modules/Redux';

import {
  useCreateSubspaceMutation,
  useSubscribeSubspaceMutation,
  useUnsubscribeSubspaceMutation,
} from 'src/generated/apollo';

const api = () => {
  // Use a pattern where if undefined then load it
  // otherwise return the value. jk
  const createSubspaceMutation = useCustomMutation<
    typeof createSubspace,
    typeof useCreateSubspaceMutation
  >(createSubspace, useCreateSubspaceMutation, undefined, false);

  const subscribeSubspaceMutation = useCustomMutation<
    typeof subscribeSubspace,
    typeof useSubscribeSubspaceMutation
  >(subscribeSubspace, useSubscribeSubspaceMutation, undefined, false);

  const unsubscribeSubspaceMutation = useCustomMutation<
    typeof unsubscribeSubspace,
    typeof useUnsubscribeSubspaceMutation
  >(unsubscribeSubspace, useUnsubscribeSubspaceMutation, undefined, false);

  console.log('@ see how many times this gets initialized');
  const onCreateSubspace = async ({
    name,
    fieldTwo = null,
    fieldThree = null,
    fieldFour = null,
    workspaceId = '',
  }: {
    name: string;
    fieldTwo: string | null;
    fieldThree: string | null;
    fieldFour: string | null;
    workspaceId: string;
  }) => {
    await createSubspaceMutation({
      variables: { subspaceInput: { name, fieldTwo, fieldThree, fieldFour, workspaceId } },
    });
  };

  const onSubscribeSubspace = async ({
    subspaceId,
    workspaceId,
  }: {
    subspaceId: string;
    workspaceId: string;
  }) => {
    await subscribeSubspaceMutation({
      variables: { subspaceId, workspaceId },
    });
  };

  const onUnsubscribeSubspace = async ({
    subspaceId,
  }: {
    subspaceId: string;
  }) => {
    await unsubscribeSubspaceMutation({ variables: { subspaceId } });
  };

  return {
    onCreateSubspace,
    onSubscribeSubspace,
    onUnsubscribeSubspace,
  };
};

export type SubspaceApiType = typeof api;

export type SubspaceApiResultType = ReturnType<SubspaceApiType>;

export default api;
