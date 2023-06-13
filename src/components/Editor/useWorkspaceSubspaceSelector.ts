import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { shallowEqual } from 'react-redux';

import {
  useAppDispatch,
  useAppSelector,
  useCustomQuery,
} from 'src/modules/Redux';
import {
  serverFetchWorkspace,
  clientFetchSubspaces,
  clientClearSubspaces,
} from 'src/modules/Workspace/slice';
import {
  useFetchWorkspacesLazyQuery,
  useFetchSubspacesLazyQuery,
} from 'src/generated/apollo';

type Option = Record<string, string>;

type Selector = {
  options: Option;
  selectedId?: string;
  updateSelected: Dispatch<SetStateAction<string | undefined>>;
};

type useWorkspaceSubspaceSelectorReturn = {
  workspace: Selector;
  subspace: Selector;
};

const useWorkspaceSubspaceSelector = (
  initiallySelectedWorkspaceId?: string,
  initiallySelectedSubspaceId?: string
): useWorkspaceSubspaceSelectorReturn => {
  const dispatch = useAppDispatch();

  // fetchWorkspaces may not be necessary
  const fetchWorkspaces = useCustomQuery<
    typeof serverFetchWorkspace,
    typeof useFetchWorkspacesLazyQuery
  >(serverFetchWorkspace, useFetchWorkspacesLazyQuery, undefined, false);

  const fetchSubspaces = useCustomQuery<
    typeof clientFetchSubspaces,
    typeof useFetchSubspacesLazyQuery
  >(clientFetchSubspaces, useFetchSubspacesLazyQuery, undefined, false);

  const [selectedWorkspaceId, setSelectedWorkspaceId] = React.useState(
    initiallySelectedWorkspaceId
  );
  const [selectedSubspaceId, setSelectedSubspaceId] = React.useState(
    initiallySelectedSubspaceId
  );

  React.useEffect(() => {
    fetchWorkspaces({ variables: { page: 0, limit: 100 } });
  }, []);

  React.useEffect(() => {
    setSelectedSubspaceId(undefined);
    dispatch(clientClearSubspaces());

    if (selectedWorkspaceId) {
      fetchSubspaces({
        variables: { workspaceId: selectedWorkspaceId, pageNumber: 0 },
      });
    }
  }, [selectedWorkspaceId]);

  const reduxState = useAppSelector(
    state => ({
      workspaces: state?.workspace?.server?.workspace,
      subspaces: state?.workspace?.subspaces,
    }),
    shallowEqual
  );

  const workspaces = React.useMemo<Option>(() => {
    if (Array.isArray(reduxState.workspaces)) {
      return reduxState.workspaces.reduce((acc, workspace) => {
        acc[workspace.id] = workspace.name;
        return acc;
      }, {});
    }
    return {};
  }, [reduxState.workspaces]);

  const subspaces = React.useMemo<Option>(() => {
    if (Array.isArray(reduxState.subspaces)) {
      return reduxState.subspaces.reduce<Option>((acc, subspace) => {
        acc[subspace.id] = subspace.name;
        return acc;
      }, {});
    }
    return {};
  }, [reduxState.subspaces]);

  return {
    workspace: {
      options: workspaces,
      selectedId: selectedWorkspaceId,
      updateSelected: setSelectedWorkspaceId,
    },
    subspace: {
      options: subspaces,
      selectedId: selectedSubspaceId,
      updateSelected: setSelectedSubspaceId,
    },
  };
};

export default useWorkspaceSubspaceSelector;
