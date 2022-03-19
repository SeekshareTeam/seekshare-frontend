import * as React from 'react';
import workspaceApiHook, { WorkspaceApiResultType } from 'src/api/workspace';
import subspaceApiHook, { SubspaceApiResultType } from 'src/api/subspace';

export interface ApiContextInterface {
  workspaceApi?: WorkspaceApiResultType;
  subspaceApi?: SubspaceApiResultType;
}

export const ApiContext = React.createContext<Readonly<ApiContextInterface>>(
  {}
);

export const ApiProvider: React.FC = (props) => {
  const workspaceApi: WorkspaceApiResultType = workspaceApiHook();
  const subspaceApi: SubspaceApiResultType = subspaceApiHook();

  const value: ApiContextInterface = {
    workspaceApi,
    subspaceApi,
  };

  return (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  );
};

export const useWorkspaceApi = () => {
  const api = React.useContext(ApiContext);

  return api.workspaceApi;
};

export const useSubspaceApi = () => {
  const api = React.useContext(ApiContext);

  return api.subspaceApi;
};

// export const useApi = <K extends keyof ApiContextInterface>(
//   apiName: K
// ): ApiContextInterface[K] => {
//   const api = React.useContext(ApiContext);
//
//   switch (apiName) {
//     case 'workspace':
//       return api.workspaceApi;
//     case 'subspaceApi':
//       return api.subspaceApi;
//     default:
//       return undefined;
//   }
//
//   // return api;
// };
