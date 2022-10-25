import * as React from 'react';

import { createWorkspace } from 'src/modules/Workspace/slice';

import { useCustomMutation } from 'src/modules/Redux';

import { useCreateWorkspaceMutation } from 'src/generated/apollo';

const api = () => {
  const [createWorkspaceMutation] = useCustomMutation<
    typeof createWorkspace,
    typeof useCreateWorkspaceMutation
  >({
    action: createWorkspace,
    useApolloMutation: useCreateWorkspaceMutation,
    variables: undefined,
    onMount: false,
  });

  const onCreateWorkspace = React.useCallback(
    async ({
      name,
      description,
      workspacePermission,
      bgImageUrl,
    }: {
      name: string;
      description: string;
      workspacePermission: string;
      bgImageUrl: string;
    }) => {
      return createWorkspaceMutation({
        variables: {
          workspaceInput: {
            name,
            description,
            workspacePermission,
            bgImageUrl,
          },
        },
      });
    },
    []
  );

  return React.useMemo(
    () => ({
      onCreateWorkspace,
    }),
    []
  );
};

export type WorkspaceApiType = typeof api;

export type WorkspaceApiResultType = ReturnType<WorkspaceApiType>;

export default api;
