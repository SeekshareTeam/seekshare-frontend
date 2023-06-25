import * as React from 'react';

/* State Management */
import { WorksheetItem as WorksheetItemType } from 'src/generated/types';

/* Components */
// import TagItem from 'src/components/Tags';
// import QuizQuestionDisplay from 'src/sections/user/Dashboard/QuizQuestionDisplay';
import QuestionViewer from 'src/plugins/plugins/quiz_handler/Question';

export const headers = () => ({
  cell1: <p className="font-semibold">{'Title'}</p>,
  cell2: <p className="font-semibold">{'Question Count'}</p>,
  cell3: <p className="font-semibold">{'Date Created'}</p>,
  itemKey: 'worksheet_header',
});

/**
 * Question
 * Type
 * Difficulty
 * Analytics
 * Tags
 * Date
 */

export const gridData = (params: { worksheetItems: WorksheetItemType[] }) => {
  return params.worksheetItems.map((item) => {
    return {
      cell1: <QuestionViewer text={item.title} />,
      cell2: <p>{item.quizCount}</p>,
      cell3: <p>{item.createdAt}</p>,
      itemKey: `worksheet_grid_${item.id}`,
    };
  });
};
