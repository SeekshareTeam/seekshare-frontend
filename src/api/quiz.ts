import * as React from 'react';
//
import { toast } from 'react-toastify';
import {
  useCustomMutation,
  useCustomQuery,
  useAppDispatch,
} from 'src/modules/Redux';
import { isEmpty } from 'lodash';

/* APIs */
import {
  useCreateQuizMutation,
  usePublishWorksheetMutation,
  useFetchWorksheetLazyQuery,
} from 'src/generated/apollo';

/* Actions */
import {
  addQuizToQueue,
  clearQuizQueue,
  addWorksheet,
  fetchWorksheet,
} from 'src/modules/Quiz/slice';

const api = () => {
  const dispatch = useAppDispatch();

  const [createQuizMutation, { data: createQuizData }] = useCustomMutation<
    typeof addQuizToQueue,
    typeof useCreateQuizMutation
  >({
    action: addQuizToQueue,
    useApolloMutation: useCreateQuizMutation,
    variables: undefined,
    onMount: false,
  });

  React.useEffect(() => {
    if (!isEmpty(createQuizData)) {
      toast.success('Question Added!', {
        position: 'bottom-right',
        autoClose: 1000,
        hideProgressBar: true,
        pauseOnHover: false,
        theme: 'colored',
      });
    }
  }, [createQuizData]);

  const clearQuizQueueAction = () => {
    dispatch(clearQuizQueue());
  };

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
    clearQuizQueueAction,
  };
};

export type QuizApiType = typeof api;

export type QuizApiResultType = ReturnType<QuizApiType>;

export default api;
