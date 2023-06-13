// import * as React from 'react';
//
// import { toast } from 'react-toastify';
import { useCustomMutation } from 'src/modules/Redux';

/* APIs */
import { useCreateQuizMutation } from 'src/generated/apollo';

/* Actions */
import { addQuizToStack } from 'src/modules/Quiz/slice';

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

  return {
    createQuizMutation,
  };
};

export type QuizApiType = typeof api;

export type QuizApiResultType = ReturnType<QuizApiType>;

export default api;
