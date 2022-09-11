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
    }: {
      name: string;
      description: string;
      workspacePermission: string;
    }) => {
      return createWorkspaceMutation({
        variables: {
          workspaceInput: { name, description, workspacePermission },
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
