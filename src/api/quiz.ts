// import * as React from 'react';
//
// import { toast } from 'react-toastify';
import { useCustomMutation, useCustomQuery } from 'src/modules/Redux';

/* APIs */
import {
  useCreateQuizMutation,
  usePublishWorksheetMutation,
  useFetchWorksheetLazyQuery,
} from 'src/generated/apollo';

/* Actions */
import {
  addQuizToStack,
  addWorksheet,
  fetchWorksheet,
} from 'src/modules/Quiz/slice';

const api = () => {
  const [createQuizMutation] = useCustomMutation<
    typeof addQuizToStack,
    typeof useCreateQuizMutation
  >({
    action: addQuizToStack,
    useApolloMutation: useCreateQuizMutation,
    variables: undefined,
    onMount: false,
  });

  const [publishWorksheet] = useCustomMutation<
    typeof addWorksheet,
    typeof usePublishWorksheetMutation
  >({
    action: addWorksheet,
    useApolloMutation: usePublishWorksheetMutation,
    variables: undefined,
    onMount: false,
  });

  const fetchWorksheetQuery = useCustomQuery<
    typeof fetchWorksheet,
    typeof useFetchWorksheetLazyQuery
  >(fetchWorksheet, useFetchWorksheetLazyQuery, undefined, false);

  return {
    createQuizMutation,
    publishWorksheet,
    fetchWorksheetQuery,
  };
};

export type QuizApiType = typeof api;

export type QuizApiResultType = ReturnType<QuizApiType>;

export default api;
