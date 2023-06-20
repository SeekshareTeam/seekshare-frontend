import * as React from 'react';

/* State Management */
import { Quiz as QuizType } from 'src/generated/types';
import { addQuizToQueue } from 'src/modules/Quiz/slice';
import { useAppDispatch } from 'src/modules/Redux';

/* Components */
import QuestionViewer from 'src/plugins/plugins/quiz_handler/Question';
import QuizDisplayModal from 'src/plugins/plugins/quiz_handler/QuizDisplayModal';
import { IconEye } from '@tabler/icons';

const QuizQuestionDisplay: React.FC<{ quiz?: QuizType }> = (props) => {
  const [showQuizDisplay, setShowQuizDisplay] = React.useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className="flex">
      <QuizDisplayModal
        showQuizDisplay={showQuizDisplay}
        setShowQuizDisplay={setShowQuizDisplay}
        quiz={props?.quiz}
      />

      <div className="w-7 shrink-0 self-center">
        <input
          onClick={(e) => {
            console.log('@@@ checkbox', (e.target as HTMLInputElement).checked);
            if (props.quiz) {
              dispatch(addQuizToQueue(props.quiz));
            }
          }}
          type="checkbox"
        />
      </div>
      <div
        className="w-7 shrink-0 self-center hover:opacity-50 cursor-pointer"
        onClick={() => {
          setShowQuizDisplay(true);
        }}
      >
        <IconEye size={18} />
      </div>
      <div className="flex-1 overflow-x-auto py-4">
        <QuestionViewer text={props?.quiz?.question?.body || ''} />
      </div>
    </div>
  );
};

export default QuizQuestionDisplay;
