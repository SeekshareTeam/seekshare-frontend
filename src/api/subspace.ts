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
  const [createSubspaceMutation, { error: errorCreateSubspace }] = useCustomMutation<
    typeof createSubspace,
    typeof useCreateSubspaceMutation
  >({
    action: createSubspace,
    useApolloMutation: useCreateSubspaceMutation,
    variables: undefined,
    onMount: false,
  });

  const subscribeSubspaceMutation = useCustomMutation<
    typeof subscribeSubspace,
    typeof useSubscribeSubspaceMutation
  >({
    action: subscribeSubspace,
    useApolloMutation: useSubscribeSubspaceMutation,
    variables: undefined,
    onMount: false,
  });

  const unsubscribeSubspaceMutation = useCustomMutation<
    typeof unsubscribeSubspace,
    typeof useUnsubscribeSubspaceMutation
  >({
    action: unsubscribeSubspace,
    useApolloMutation: useUnsubscribeSubspaceMutation,
    variables: undefined,
    onMount: false,
  });

  const onCreateSubspace = async ({
    name,
    fieldTwo = null,
    fieldThree = null,
    fieldFour = null,
    workspaceId = '',
    subspaceImgUrl = '',
  }: {
    name: string;
    fieldTwo: string | null;
    fieldThree: string | null;
    fieldFour: string | null;
    workspaceId: string;
    subspaceImgUrl: string;
  }) => {
    await createSubspaceMutation({
      variables: {
        subspaceInput: { name, fieldTwo, fieldThree, fieldFour, workspaceId, subspaceImgUrl },
      },
    });
  };

  // const onSubscribeSubspace = async ({
  //   subspaceId,
  //   workspaceId,
  // }: {
  //   subspaceId: string;
  //   workspaceId: string;
  // }) => {
  //   await subscribeSubspaceMutation({
  //     variables: { subspaceId, workspaceId },
  //   });
  // };

  // const onUnsubscribeSubspace = async ({
  //   subspaceId,
  // }: {
  //   subspaceId: string;
  // }) => {
  //   await unsubscribeSubspaceMutation({ variables: { subspaceId } });
  // };

  return {
    subscribeSubspaceMutation,
    unsubscribeSubspaceMutation,
    onCreateSubspace,
    errorCreateSubspace
  };
};

export type SubspaceApiType = typeof api;

export type SubspaceApiResultType = ReturnType<SubspaceApiType>;

export default api;
