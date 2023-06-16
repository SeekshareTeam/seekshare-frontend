import * as React from 'react';
import { isEmpty } from 'lodash';

/* State Management */
import { Quiz as QuizType } from 'src/generated/types';
import { ConfigType } from 'src/utils/types';

/* Components */
import GridTable from 'src/components/GridTable/';
import { gridData, headers } from './QuizRow';

interface Props {
  quizzes?: QuizType[];
}

const useQuizzes = (props: Props) => {
  const [quizzes, setQuizzes] = React.useState(props?.quizzes || []);

  React.useEffect(() => {
    if (props.quizzes) {
      setQuizzes(props.quizzes);
    }
  }, [props.quizzes]);

  return { quizzes, setQuizzes };
};

const QuizGrid: React.FC<Props> = (props) => {
  /*
     Date
     User (name, image)
     title
     tags
   */
  const { quizzes } = useQuizzes(props);

  if (isEmpty(props.quizzes)) {
    return (
      <p className="text-nord-0 dark:text-nord-6 text-xl">{'No Activity.'}</p>
    );
  }

  const config: ConfigType<
    'cell1' | 'cell2' | 'cell3' | 'cell4' | 'cell5' | 'cell6'
  >[] = [
    { width: 2, key: 'cell1' },
    { width: 1, key: 'cell2' },
    { width: 1, key: 'cell3' },
    { width: 1, key: 'cell4' },
    { width: 1, key: 'cell5' },
    { width: 1, key: 'cell6' },
  ];

  return (
    <div className="mx-4 p-2 rounded-lg bg-node-4 dark:bg-nord-1">
      <GridTable
        config={config}
        columns={7}
        headers={headers()}
        gridData={gridData({ quizzes })}
        keyName="dashboard_grid_table"
      />
    </div>
  );
};

export default QuizGrid;
