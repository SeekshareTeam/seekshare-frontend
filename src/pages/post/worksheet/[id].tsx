import * as React from 'react';

import { PageWithLayout } from 'src/utils/types';

import { useAppSelector } from 'src/modules/Redux';

import { wrapper } from 'src/modules/Redux';
import { useQuizApi } from 'src/api/context';


interface WorksheetProps {
  worksheetId?: string;
}

const Worksheet: PageWithLayout<WorksheetProps> = (props) => {
  const quizApi = useQuizApi();

  const reduxState = useAppSelector((state) => ({
    quizList: state.quiz?.data?.publishedWorksheet,
  }));

  React.useEffect(() => {
    if (props.worksheetId) {
      (async () => {
        await quizApi.fetchWorksheetQuery({
          variables: { worksheetId: props.worksheetId },
        });
      })();
    }
  }, [props.worksheetId]);

  console.log('@@@ quizList', reduxState.quizList);
  return null;

};

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: true, //indicates the type of fallback
  };
};

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    console.log('@@@ store', store);

    const worksheetId = context?.params?.id;

    return {
      props: { worksheetId: worksheetId },
    };
  }
);

Worksheet.layoutType = 'general';

export default Worksheet;
