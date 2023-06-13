import * as React from 'react';
import workspaceApiHook, { WorkspaceApiResultType } from 'src/api/workspace';
import subspaceApiHook, { SubspaceApiResultType } from 'src/api/subspace';
import authApiHook, { AuthApiResultType } from 'src/api/auth';
import quizApiHook, { QuizApiResultType } from 'src/api/quiz';

export interface ApiContextInterface {
  workspaceApi: WorkspaceApiResultType;
  subspaceApi: SubspaceApiResultType;
  authApi: AuthApiResultType;
  quizApi: QuizApiResultType;
}

/**
 * This does not actually match ApiContextType
 * Laterwards take the approach described in the following blog:
 * https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */
export const ApiContext = React.createContext<Readonly<ApiContextInterface>>(
  {} as ApiContextInterface
);

interface Props {
  children?: React.ReactNode;
}

export const ApiProvider: React.FC<Props> = (props) => {
  const workspaceApi: WorkspaceApiResultType = workspaceApiHook();
  const subspaceApi: SubspaceApiResultType = subspaceApiHook();
  const authApi: AuthApiResultType = authApiHook();
  const quizApi: QuizApiResultType = quizApiHook();

  const value: ApiContextInterface = {
    workspaceApi,
    subspaceApi,
    authApi,
    quizApi,
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

export const useAuthApi = () => {
  const api = React.useContext(ApiContext);

  return api.authApi;
};

export const useQuizApi = () => {
  const api = React.useContext(ApiContext);

  return api.quizApi;
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
