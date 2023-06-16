import * as React from 'react';

import { PageWithLayout } from 'src/utils/types';
import { useAppSelector } from 'src/modules/Redux';
import { wrapper } from 'src/modules/Redux';
import { useQuizApi } from 'src/api/context';

import WorksheetLayout from 'src/sections/post/WorksheetLayout';

interface WorksheetPageLayoutProps {
  worksheetLayout: React.ReactNode;
}

const WorksheetPageLayout: React.FC<WorksheetPageLayoutProps> = (props) => {
  return (
    <div className="flex flex-1 justify-center md:mx-8 md:my-2">
      {props.worksheetLayout}
    </div>
  );
};

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

  return (
    <WorksheetPageLayout
      worksheetLayout={<WorksheetLayout publishedSet={reduxState.quizList} />}
    />
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: true, //indicates the type of fallback
  };
};

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    console.log('store', store);
    const worksheetId = context?.params?.id;

    return {
      props: { worksheetId: worksheetId },
    };
  }
);

Worksheet.layoutType = 'general';

export default Worksheet;
