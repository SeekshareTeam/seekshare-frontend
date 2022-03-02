import * as React from 'react';
import useWorkspaceApi, { WorkspaceApiResultType } from 'src/api/workspace';

export interface ApiContextInterface {
  workspaceApi?: WorkspaceApiResultType;
}

export const ApiContext = React.createContext<Readonly<ApiContextInterface>>({
});

export const ApiProvider: React.FC = (props) => {
  // const [workspaceApi, _] = React.useState<WorkspaceApiResultType>(
  //   useWorkspaceApi()
  // );

  const workspaceApi: WorkspaceApiResultType = useWorkspaceApi();

  const value: ApiContextInterface = {
    workspaceApi,
  };

  return (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  );
};

type ValueOf<T> = T[keyof T];

export const useApi = (apiName: 'workspace' | 'subspace' ): ValueOf<ApiContextInterface> => {
  const api = React.useContext(ApiContext);

  switch (apiName) {
    case 'workspace':
      return api.workspaceApi;
    default:
      return undefined;
  }

  // return api;
};
