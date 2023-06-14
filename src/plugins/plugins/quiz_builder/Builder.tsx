import * as React from 'react';

/* State Management & APIs */
import { QuizOption } from 'src/utils/types';
import { useQuizApi } from 'src/api/context';

import { DropdownOption } from 'src/components/Dropdown';

import TagExtension from 'src/components/Editor/Toolbar/TagExtension';
import { ManageTagsHandle } from 'src/components/Tags/Create';
import MultipleChoice, {
  useResponseTypes,
} from 'src/plugins/plugins/quiz_builder/MultipleChoice';
import TagButton, { useTagHook } from 'src/components/Tags/Button';
import { Button } from 'src/components/Button';
import { useQuestionState } from './Question';
import QuizType from './QuizType';
import QuizViewer from './QuizViewer';
import QuizQueueButton from './QuizQueueModal';

interface LayoutProps {
  quizType: React.ReactNode;

  tagNode: React.ReactNode;

  tagExtension: React.ReactNode;

  submitBox: React.ReactNode;

  leftView: React.ReactNode;

  rightView: React.ReactNode;
}

const QuizBuilderLayout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="flex mx-4">
        <div className="flex flex-1 mt-2 mb-4 items-center space-x-2">
          {props.quizType}
          {props.tagNode}
          {props.tagExtension}
        </div>
      </div>
      <div className="flex flex-1 mx-4">
        <div className="flex-1 flex flex-col">
          <div className="h-full overflow-y-auto flex flex-col">
            {props.leftView}
            {props.submitBox}
          </div>
        </div>
        <div className="flex-1 mt-10">{props.rightView}</div>
      </div>
    </div>
  );
};

const QuizControl: React.FC<{
  type: string | undefined;
  question: string;
  setQuestion: (val: string) => void;
  options: QuizOption[];
  setOptions: (options: QuizOption[]) => void;
  workspaceId: string | undefined;
  subspaceId: string | undefined;
  active: string;
  setActive: (val: string) => void;
  responseTypes: { tabKey: string; tabValue: string }[];
}> = (props) => {
  switch (props.type) {
    case 'multiple':
      return (
        <MultipleChoice
          options={props.options}
          setOptions={props.setOptions}
          question={props.question}
          setQuestion={props.setQuestion}
          workspaceId={props.workspaceId}
          subspaceId={props.subspaceId}
          active={props.active}
          setActive={props.setActive}
          responseTypes={props.responseTypes}
        />
      );
    default:
      return null;
  }
};

const useQuizOptions = () => {
  const quizOptionList: DropdownOption[] = React.useMemo(() => {
    return [
      {
        text: 'Multiple Choice',
        type: 'multiple',
        id: 'multiple_choice',
        href: '',
      },
      { text: 'Longform Text', type: 'longform', id: 'longform', href: '' },
    ];
  }, []);

  const [quizType, setQuizType] = React.useState<DropdownOption>(
    quizOptionList[0]
  );

  return {
    quizType,
    setQuizType,
    quizOptionList,
  };
};

const useOptionResponses = () => {
  const [options, setOptions] = React.useState<QuizOption[]>([]);

  return { options, setOptions };
};

interface Props {
  subspaceId?: string;
  workspaceId?: string;
}

const QuizBuilder: React.FC<Props> = (props) => {
  const { quizType, setQuizType, quizOptionList } = useQuizOptions();
  const { options, setOptions } = useOptionResponses();
  const { question, setQuestion } = useQuestionState();
  const { currentTags, setCurrentTags } = useTagHook();
  const { active, setActive, responseTypes } = useResponseTypes();
  const quizApi = useQuizApi();

  const tagRef = React.useRef<ManageTagsHandle>(null);

  return (
    <QuizBuilderLayout
      quizType={
        <QuizType
          optionList={quizOptionList}
          onOptionClick={setQuizType}
          option={quizType}
        />
      }
      tagNode={
        <TagButton
          currentTags={currentTags}
          setCurrentTags={setCurrentTags}
          workspaceId={props.workspaceId}
          subspaceId={props.subspaceId}
          tagRef={tagRef}
        />
      }
      tagExtension={<TagExtension tags={currentTags} />}
      leftView={
        <QuizControl
          type={quizType.type}
          options={options}
          setOptions={setOptions}
          question={question}
          setQuestion={setQuestion}
          workspaceId={props.workspaceId}
          subspaceId={props.subspaceId}
          active={active}
          setActive={setActive}
          responseTypes={responseTypes}
        />
      }
      rightView={<QuizViewer question={question} options={options} />}
      submitBox={
        <div className="mb-2 flex items-center">
          <div className="flex flex-1">
            <QuizQueueButton
              workspaceId={props.workspaceId}
              subspaceId={props.subspaceId}
            />
          </div>
          <div className="flex-1 flex justify-end">
            <Button
              variant={'primary'}
              size={'large'}
              radius={'large'}
              onClick={async () => {
                if (props.workspaceId && props.subspaceId) {
                  await quizApi.createQuizMutation({
                    variables: {
                      quizInput: {
                        body: question,
                        type: active,
                        tags: currentTags.map(t => t.id),
                        options: options.map((option) => ({
                          body: option.val,
                          isAnswer:
                            typeof option.answerValue === 'boolean'
                              ? option.answerValue
                              : true,
                        })),
                      },
                      workspaceId: props.workspaceId,
                      subspaceId: props.subspaceId,
                    },
                  });
                }
              }}
            >
              {'Add Question'}
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default QuizBuilder;
