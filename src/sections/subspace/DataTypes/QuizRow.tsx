import * as React from 'react';

/* State Management */
import { Quiz as QuizType } from 'src/generated/types';

/* Components */
import TagItem from 'src/components/Tags';
import QuestionViewer from 'src/plugins/plugins/quiz_handler/Question';

export const headers = () => ({
  cell1: <p className="font-semibold">{'Question'}</p>,
  cell2: <p className="font-semibold">{'Type'}</p>,
  cell3: <p className="font-semibold">{'Difficulty'}</p>,
  cell4: <p className="font-semibold">{'Tags'}</p>,
  cell5: <p className="font-semibold">{'Frequency'}</p>,
  cell6: <p className="font-semibold">{'Date Created'}</p>,
  itemKey: 'dashboard_header',
});

/**
 * Question
 * Type
 * Difficulty
 * Analytics
 * Tags
 * Date
 */

export const gridData = (params: { quizzes: QuizType[] }) => {
  return params.quizzes.map((quiz, ix) => {
    return {
      cell1: (
        <div className="cursor-pointer">
          <QuestionViewer text={quiz?.question?.body || ''} />
        </div>
      ),
      cell2: <p>{quiz.type}</p>,
      cell3: <p>{'Easy'}</p>,
      cell4:
        (quiz?.quizTags || []).length > 0 ? (
          <div className="flex flex-wrap space-y-1">
            {quiz?.quizTags?.map((tag, ix) => {
              return (
                <div key={tag.value} className={`${ix > 0 ? 'mr-1' : ''}`}>
                  <TagItem colorString={tag.colorString} value={tag.value} />
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-nord-0 dark:text-nord-6">{'No Tags'}</p>
        ),
      cell5: <p className="dark:text-nord-4">{0}</p>,
      cell6: <p>{quiz.createdAt}</p>,
      itemKey: `dashboard_grid_${ix}`,
    };
  });
};
