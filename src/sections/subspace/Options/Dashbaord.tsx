import * as React from 'react';

/* State Management */
import { useAppSelector } from 'src/modules/Redux';
import { useQuizApi } from 'src/api/context';

/* Components */
import {
  ReusableDropdown,
  DropdownOption as DropdownOptionType,
} from 'src/components/Dropdown';
import { Modal } from 'src/components/Modal';
import { IconPlus } from '@tabler/icons';
import {
  QuizQueueModal,
  useQuizQueueModal,
} from 'src/plugins/plugins/quiz_builder/QuizQueueModal';

const useQueueState = () => {
  const reduxState = useAppSelector((state) => ({
    queue: state.quiz?.data?.queue,
  }));

  const quizApi = useQuizApi();

  React.useEffect(() => {
    return () => {
      quizApi.clearQuizQueueAction();
    };
  }, [quizApi]);

  const queueSize = Array.isArray(reduxState.queue)
    ? reduxState.queue.length
    : 0;

  return { queueSize };
};

const DashboardOptions: React.FC<{
  workspaceId: string;
  subspaceId: string;
}> = (props) => {
  const [options, setOptions] = React.useState([
    { id: 'worksheet', text: 'Publish Worksheet', rightNumber: 0 },
    { id: 'create', text: 'Create Quiz' },
  ]);
  const { showQuizQueue, setShowQuizQueue } = useQuizQueueModal();

  const { queueSize } = useQueueState();

  React.useEffect(() => {
    const queueOptions = options.map((opt) => {
      if (opt.id === 'worksheet') {
        return { ...opt, rightNumber: queueSize || undefined };
      }
      return opt;
    });

    setOptions(queueOptions);
  }, [queueSize]);

  return (
    <>
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
      <ReusableDropdown
        position={'below'}
        horizontalPosition={'right'}
        optionList={options}
        bgColor={{
          dark: 'bg-nord-7/75 dark:hover:bg-nord-7',
          medium: 'bg-nord-7/75 dark:hover:bg-nord-7 ',
          light: 'bg-nord-7',
        }}
        dropdownButton={(
          _: DropdownOptionType | null,
          dropdownRef: React.RefObject<HTMLButtonElement>
        ) => {
          return (
            <>
              {queueSize > 0 && (
                <div className="z-50 absolute flex items-center justify-center right-0 top-0 -translate-y-1/4 translate-w-1/2 w-5 h-5 text-xs rounded-full dark:bg-red-700 text-gray-100">
                  <span>{queueSize}</span>
                </div>
              )}
              <button
                ref={dropdownRef}
                className={`rounded-full shadow-xl ${
                  false ? 'dark:bg-green-700' : 'dark:bg-nord-7/75'
                } dark:hover:brightness-110 p-2`}
              >
                <IconPlus size={24} />
              </button>
            </>
          );
        }}
        onOptionClick={(option) => {
          if (option.id === 'worksheet') {
            setShowQuizQueue(true);
          }
        }}
      />
    </>
  );
};

export default DashboardOptions;
