import * as React from 'react';

/* State Management & APIs */
import { useAppSelector } from 'src/modules/Redux';
import { useQuizApi } from 'src/api/context';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';

import { Button } from 'src/components/Button';
import { IconBoxMultiple } from '@tabler/icons';
import { Modal } from 'src/components/Modal';
import Viewer from 'src/plugins/components/Viewer';

interface Props {
  workspaceId?: string;
  subspaceId?: string;
}

export const QuizQueueModal: React.FC<Props> = (props) => {
  const [quizIds, setQuizIds] = React.useState<string[]>([]);
  const [title, setTitle] = React.useState<string>('');
  const [disableButton, setDisableButton] = React.useState<boolean>(true);
  const titleRef = React.useRef<HTMLInputElement>(null);
  const quizApi = useQuizApi();
  const router = useRouter();

  const reduxState = useAppSelector((state) => ({
    quizQueue: state.quiz?.data?.queue,
    publishedWorksheet: state.quiz?.data?.publishedWorksheet,
  }));

  React.useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  React.useEffect(() => {
    if (reduxState.publishedWorksheet?.quizGroup) {
      router.push(
        '/post/worksheet/' + reduxState?.publishedWorksheet?.quizGroup
      );
    }
  }, [reduxState.publishedWorksheet]);

  React.useEffect(() => {
    const disableStatus = isEmpty(title) || isEmpty(quizIds);
    setDisableButton(disableStatus);
  }, [title, quizIds]);

  return (
    <div className="flex flex-col bg-nord-6 dark:bg-gray-800 rounded-lg px-4 py-2  w-1/2">
      {/**<h4 className={'font-semibold text-lg my-1 bg-none'}>{'Publish Worksheet'}</h4>**/}
      <input
        type="text"
        className="w-full text-2xl dark:bg-gray-800 my-1 dark:text-nord-4 outline-none"
        placeholder="Insert Worksheet Title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle((e.target as HTMLInputElement).value);
        }}
        ref={titleRef}
      />
      <p className="text-nord-4">
        {'Select questions to publish in a worksheet.'}
      </p>
      {reduxState?.quizQueue?.map((quiz, ix) => {
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
              <div className="flex flex-1 text-left">
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
      <div className="flex justify-center my-1 ">
        <button
          className={`p-2 rounded-lg self-center dark:bg-nord-8 dark:bg-nord-8/50 ${
            disableButton ? '' : 'dark:hover:bg-nord-8/75'
          }`}
          disabled={isEmpty(title) || isEmpty(quizIds)}
          onClick={async () => {
            if (props.workspaceId && props.subspaceId) {
              await quizApi.publishWorksheet({
                variables: {
                  quizIds,
                  title,
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

export const useQuizQueueModal = () => {
  const [showQuizQueue, setShowQuizQueue] = React.useState(false);

  return {
    showQuizQueue,
    setShowQuizQueue,
  };
};

const QuizQueueButton: React.FC<Props> = (props) => {
  const { showQuizQueue, setShowQuizQueue } = useQuizQueueModal();

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
