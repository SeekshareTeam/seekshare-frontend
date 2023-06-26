import * as React from 'react';

/* State Management */
import { WorksheetItem as WorksheetItemType } from 'src/generated/types';
import { useRouter } from 'next/router';

/* Components */
// import TagItem from 'src/components/Tags';
// import QuizQuestionDisplay from 'src/sections/user/Dashboard/QuizQuestionDisplay';
import QuestionViewer from 'src/plugins/plugins/quiz_handler/Question';
import { IconEye } from '@tabler/icons';

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
  const router = useRouter();

  return params.worksheetItems.map((item) => {
    return {
      cell1: (
        <div className="flex justify-start items-center">
          <div
            className="w-7 shrink-0 self-center hover:opacity-50 cursor-pointer"
            onClick={() => {
              router.push('/post/worksheet/' + item.id);
            }}
          >
            <IconEye size={18} />
          </div>
          <QuestionViewer text={item.title} />
        </div>
      ),
      cell2: <p>{item.quizCount}</p>,
      cell3: <p>{item.createdAt}</p>,
      itemKey: `worksheet_grid_${item.id}`,
    };
  });
};
