import * as React from 'react';

/* State Management */
import { Quiz as QuizType } from 'src/generated/types';
import { isEmpty } from 'lodash';

import { Modal } from 'src/components/Modal';
import QuizInput from 'src/plugins/plugins/quiz_handler/QuizInput';

const QuizDisplayModal: React.FC<{
  quiz?: QuizType;
  showQuizDisplay: boolean;
  setShowQuizDisplay: (val: boolean) => void;
}> = (props) => {
  if (isEmpty(props?.quiz)) {
    return null;
  }

  return (
    <Modal
      blurBackground={true}
      show={props.showQuizDisplay}
      onPressBlur={() => {
        props.setShowQuizDisplay(false);
      }}
    >
      <div className="flex rounded-lg justify-center dark:bg-gray-800 w-full md:w-1/3 p-2">
        <QuizInput quiz={props.quiz} mode={'read'} />
      </div>
    </Modal>
  );
};

export default QuizDisplayModal;
