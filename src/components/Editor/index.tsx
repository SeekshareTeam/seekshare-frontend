import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';

import 'easymde/dist/easymde.min.css';

/* State Management */
import text from './text.json';
import { PostType, QnaType } from 'src/utils/types';
import { useAppDispatch } from 'src/modules/Redux';
import { useCreatePostMutation } from 'src/generated/apollo';
import { setLoading } from 'src/modules/App/slice';
import useWorkspaceSubspaceSelector from './useWorkspaceSubspaceSelector';

/* Components */
import { TitleInput } from 'src/components/Input';
import ManageTags, { ManageTagsHandle } from 'src/components/Tags/Create';
import PostTypeDropdown, {
  getPostTypeText,
} from './PostTypeDropdown';
import WorkspaceDropdown from './WorkspaceDropdown';
import SubspaceDropdown from './SubspaceDropdown';
import type { Props as EditorProps } from 'src/plugins/components/Editor';

const classes = {
  editorContainer: 'w-full h-full flex flex-col justify-center',
  main: 'w-2/3 card p-2 self-center',
  title:
    'appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300',
  submit:
    'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-48 ml-auto mr-1 mb-1',
  provideTag: '',
};

const Editor = dynamic(() => import('src/plugins/components/Editor'), {
  ssr: false,
});

type MarkdownEditorProps = {
  onBodyChange: (val: string) => void;
  body: string;
  size?: string;
  onSubmit?: (body: string) => Promise<void>;
  type?: string;
  tabNode?: React.ReactNode;
  onPressTags: () => void;
  tabOption?: EditorProps['tabOption'];
};

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  onBodyChange,
  body,
  onSubmit,
  type,
  tabNode,
  onPressTags,
  tabOption,
}: MarkdownEditorProps) => {
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      sideBySideFullscreen: false,
      minHeight: '100px',
      placeholder: 'Insert Content...',
    }),
    []
  );

  return (
    <div className="w-full flex-1 flex">
      {tabNode}
      <Editor
        options={options}
        value={body}
        onChange={onBodyChange}
        onPressTags={onPressTags}
        tabOption={tabOption}
      />
      {type === 'comment' && (
        <div
          className={`bg-blue-400 ${
            !isEmpty(body) ? 'hover:bg-blue-600' : ''
          } text-white font-bold py-1 px-2 inline-block float-right`}
        >
          <button
            disabled={isEmpty(body)}
            onClick={async () => {
              if (onSubmit) {
                await onSubmit(body);
              }
            }}
          >
            {'Submit'}
          </button>
        </div>
      )}
    </div>
  );
};

interface Props {
  subspaceId?: string;
  workspaceId?: string;
}

const QuestionEditor: React.FC<Props> = props => {
  const [postTitle, setTitle] = React.useState('');
  const [postType, setPostType] = React.useState<PostType>('question');
  const [qnaType, setQnaType] = React.useState<QnaType>('question');
  const [bodies, setBodies] = React.useState<string[]>(['']);
  const [bodyIndex, setBodyIndex] = React.useState(0);
  const [currentTags] = React.useState<
    {
      value: string;
      id: string;
    }[]
  >([]);

  const workspaceSubspaceSelector = useWorkspaceSubspaceSelector(
    props.workspaceId,
    props.subspaceId
  );

  const tagRef = React.useRef<ManageTagsHandle>(null);
  // const scrollRef = React.useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const [createPostMutation, { loading }] = useCreatePostMutation({
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  });

  const router = useRouter();

  React.useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading]);

  const onSubmitCreatePost = React.useCallback(async () => {
    if (
      !workspaceSubspaceSelector.workspace.selectedId ||
      !workspaceSubspaceSelector.subspace.selectedId
    ) {
      alert('Select a workspace and a subspace');
      return;
    }

    const postTags = currentTags.map(ct => ct.id);
    const result = await createPostMutation({
      variables: {
        postInput: {
          bodies: bodies,
          title: postTitle,
          type: postType,
          tags: postTags,
          workspaceId: workspaceSubspaceSelector.workspace.selectedId,
          subspaceId: workspaceSubspaceSelector.subspace.selectedId,
        },
      },
    });

    if (result?.data?.createPost?.postId) {
      router.push('/post/' + result.data.createPost.postId);
    }
  }, [
    bodies,
    postTitle,
    currentTags,
    postType,
    workspaceSubspaceSelector.workspace.selectedId,
    workspaceSubspaceSelector.subspace.selectedId,
  ]);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onBodyChange = React.useCallback(
    (val: string) => {
      setBodies(state =>
        state.map((body, i) => (i === bodyIndex ? val : body))
      );
    },
    [bodyIndex]
  );

  // Configure editor tabs here
  const tabOption = React.useMemo<EditorProps['tabOption']>(() => {
    if (postType !== 'qna') {
      return undefined;
    }

    return {
      list: [
        { value: 'question', label: 'Question' },
        { value: 'answer', label: 'Answer' },
      ],
      selected: qnaType,
      onSelect: x => setQnaType(x as QnaType),
    };
  }, [postType, qnaType]);

  // Callback for when the tabs change
  React.useEffect(() => {
    if (!tabOption) {
      return setBodyIndex(0);
    }
    const index = tabOption.list.findIndex(
      item => item.value === tabOption.selected
    );

    if (index === -1) {
      return setBodyIndex(0);
    }

    if (bodies.length - 1 < index) {
      setBodies(state => {
        const newState = [...state];
        for (let i = bodies.length; i <= index; i += 1) {
          newState.push('');
        }
        return newState;
      });
    }
    setBodyIndex(index);
  }, [tabOption?.selected]);

  const postText = React.useMemo(() => getPostTypeText(postType), [postType]);

  return (
    <div className="justify-center w-full flex-1">
      <div className={classes.editorContainer}>
        <div className="flex flex-row items-center">
          <TitleInput
            inputProps={{
              onChange: onTitleChange,
              value: postTitle,
              placeholder: text.title,
              className: 'flex-1',
            }}
          />
          <PostTypeDropdown
            selectedPostType={postType}
            onSelect={s => setPostType(s as PostType)}
          />
          <WorkspaceDropdown
            selectedWorkspaceId={workspaceSubspaceSelector.workspace.selectedId}
            workspaceOptions={workspaceSubspaceSelector.workspace.options}
            onSelect={workspaceSubspaceSelector.workspace.updateSelected}
          />
          <SubspaceDropdown
            selectedSubspaceId={workspaceSubspaceSelector.subspace.selectedId}
            subspaceOptions={workspaceSubspaceSelector.subspace.options}
            onSelect={workspaceSubspaceSelector.subspace.updateSelected}
          />
        </div>
        <MarkdownEditor
          body={bodies[bodyIndex]}
          onBodyChange={onBodyChange}
          onPressTags={() => {
            tagRef.current?.showModal();
          }}
          tabOption={tabOption}
        />
        <ManageTags
          ref={tagRef}
          workspaceId={props.workspaceId}
          subspaceId={props.subspaceId}
        />
        <button className={classes.submit} onClick={onSubmitCreatePost}>
          {`Post your ${postText}`}
        </button>
      </div>
    </div>
  );
};

export default QuestionEditor;
