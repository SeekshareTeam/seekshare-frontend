import * as React from 'react';
import { toast } from 'react-toastify';
import { useCustomMutation, useCustomQuery } from 'src/modules/Redux';

/* APIs */
import {
  useCreateSubspaceMutation,
  useSubscribeSubspaceMutation,
  useUnsubscribeSubspaceMutation,
  useFetchAllQuizzesFromSubspaceLazyQuery,
  useFetchWorksheetsBySubspaceLazyQuery,
} from 'src/generated/apollo';

/* Actions */
import {
  createSubspace,
  fetchSubspaceQuizList,
  fetchWorksheetItems,
} from 'src/modules/Subspace/slice';
import { subscribeSubspace, unsubscribeSubspace } from 'src/modules/Auth/slice';

const api = () => {
  // Use a pattern where if undefined then load it
  // otherwise return the value.
  const [createSubspaceMutation, { error: errorCreateSubspace }] =
    useCustomMutation<typeof createSubspace, typeof useCreateSubspaceMutation>({
      action: createSubspace,
      useApolloMutation: useCreateSubspaceMutation,
      variables: undefined,
      onMount: false,
    });

  React.useEffect(() => {
    if (errorCreateSubspace?.message) {
      toast.error(errorCreateSubspace.message);
    }
  }, [errorCreateSubspace]);

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
    logoUrl = '',
    logoType = '',
  }: {
    name: string;
    fieldTwo: string | null;
    fieldThree: string | null;
    fieldFour: string | null;
    workspaceId: string;
    logoUrl: string;
    logoType: string;
  }) => {
    await createSubspaceMutation({
      variables: {
        subspaceInput: {
          name,
          fieldTwo,
          fieldThree,
          fieldFour,
          workspaceId,
          logoUrl,
          logoType,
        },
      },
    });
  };

  const fetchAllQuizzesFromSubspace = useCustomQuery<
    typeof fetchSubspaceQuizList,
    typeof useFetchAllQuizzesFromSubspaceLazyQuery
  >(
    fetchSubspaceQuizList,
    useFetchAllQuizzesFromSubspaceLazyQuery,
    undefined,
    false
  );

  const fetchWorksheetsBySubspace = useCustomQuery<
    typeof fetchWorksheetItems,
    typeof useFetchWorksheetsBySubspaceLazyQuery
  >(
    fetchWorksheetItems,
    useFetchWorksheetsBySubspaceLazyQuery,
    undefined,
    false
  );

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
    errorCreateSubspace,
    fetchAllQuizzesFromSubspace,
    fetchWorksheetsBySubspace,
  };
};

export type SubspaceApiType = typeof api;

export type SubspaceApiResultType = ReturnType<SubspaceApiType>;

export default api;
