import * as React from 'react';

/* State Management & APIs */
import { useAppSelector } from 'src/modules/Redux';
import { useQuizApi } from 'src/api/context';

import { Button } from 'src/components/Button';
import { IconBoxMultiple } from '@tabler/icons';
import { Modal } from 'src/components/Modal';
import Viewer from 'src/plugins/components/Viewer';

interface Props {
  workspaceId?: string;
  subspaceId?: string;
}

const QuizQueueModal: React.FC<Props> = (props) => {
  const [quizIds, setQuizIds] = React.useState<string[]>([]);
  const quizApi = useQuizApi();

  React.useEffect(() => {
    console.log('@@@ quizIds', quizIds);
  });

  const reduxState = useAppSelector((state) => ({
    quizQueue: state.quiz?.data?.queue,
  }));

  return (
    <div className="flex flex-col bg-nord-6 dark:bg-gray-800 rounded-lg px-4 py-2  w-1/2">
      <h4 className={'font-semibold text-lg my-1'}>{'Publish Worksheet'}</h4>
      <p className="text-nord-4">
        {'Select questions to publish in a worksheet.'}
      </p>
      {reduxState?.quizQueue?.map((quiz, ix) => {
        console.log('@@@ quiz queue', quiz);
        return (
          <div className="flex mx-2 my-1" key={quiz.id}>
            <button
              className={`flex p-2 rounded-lg dark:bg-nord-1 w-full hover:dark:bg-nord-2`}
              onClick={() => {
                const questionIndex = quizIds.findIndex((q) => q === quiz.id);

                if (questionIndex > -1) {
                  setQuizIds([
                    ...quizIds.slice(0, questionIndex),
                    ...quizIds.slice(questionIndex + 1),
                  ]);
                } else {
                  setQuizIds([...quizIds, quiz.id]);
                }
              }}
            >
              <div className="flex flex-1">
                <div>
                  <p className="text-xs text-nord-4 m-1">{ix + 1 + ')'}</p>
                </div>
                <Viewer mode={'read'} text={quiz?.question?.body || ''} />
              </div>
              <div
                className={`shrink-0 w-4 h-4 border ${
                  quizIds.includes(quiz.id) ? 'bg-orange-700' : 'bg-nord-1'
                } rounded`}
              ></div>
            </button>
          </div>
        );
      })}
      <div className="flex justify-center">
        <button
          className={
            'p-2 rounded-lg self-center dark:bg-nord-8 dark:bg-nord-8/50'
          }
          onClick={async () => {
            console.log('@@@ publishing');
            if (props.workspaceId && props.subspaceId) {
              await quizApi.publishWorksheet({
                variables: {
                  quizIds,
                  workspaceId: props.workspaceId,
                  subspaceId: props.subspaceId,
                },
              });
            }
          }}
        >
          {'Publish Worksheet'}
        </button>
      </div>
    </div>
  );
};

interface Props {
  workspaceId?: string;
  subspaceId?: string;
}

const QuizQueueButton: React.FC<Props> = (props) => {
  const [showQuizQueue, setShowQuizQueue] = React.useState(false);

  const reduxState = useAppSelector((state) => ({
    quizQueue: state.quiz?.data?.queue,
  }));

  return (
    <div>
      <Modal
        blurBackground={true}
        show={showQuizQueue}
        onPressBlur={() => {
          setShowQuizQueue(false);
        }}
      >
        <QuizQueueModal
          workspaceId={props.workspaceId}
          subspaceId={props.subspaceId}
        />
      </Modal>
      <Button
        className="flex items-center hover:opacity-75"
        onClick={() => {
          if (Array.isArray(reduxState.quizQueue) && reduxState.quizQueue) {
            setShowQuizQueue(true);
          }
        }}
        disabled={reduxState?.quizQueue?.length === 0}
      >
        <IconBoxMultiple className="text-nord-4" />
        <span className="text-xs mx-1">
          {reduxState?.quizQueue?.length || 0}
        </span>
      </Button>
    </div>
  );
};

export default QuizQueueButton;
