import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';

import 'easymde/dist/easymde.min.css';

/* State Management */
import text from './text.json';
import { PostType } from 'src/utils/types';
import { useAppDispatch } from 'src/modules/Redux';
import { useCreatePostMutation } from 'src/generated/apollo';
import { Tag as TagType } from 'src/generated/types';
import { setLoading } from 'src/modules/App/slice';
import useWorkspaceSubspaceSelector from './useWorkspaceSubspaceSelector';

/* Components */
import { TitleInput } from 'src/components/Input';
import ManageTags, { ManageTagsHandle } from 'src/components/Tags/Create';
import PostTypeDropdown, { getPostTypeText } from './PostTypeDropdown';
import QnaExtension, { useQnaExtensionHooks } from './Toolbar/QnaExtension';
import TagsToolbarExtension from './Toolbar/TagExtension';
import WorkspaceDropdown from './WorkspaceDropdown';
import SubspaceDropdown from './SubspaceDropdown';
import type { Props as EditorProps } from 'src/plugins/components/Editor';

const classes = {
  editorContainer: 'w-full h-full flex flex-col justify-start',
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

const QuizBuilder = dynamic(
  () => import('src/plugins/plugins/quiz_builder/Builder'),
  {
    ssr: false,
  }
);

type MarkdownEditorProps = {
  onBodyChange: (val: string) => void;
  toolbarExtensions?: {
    component: React.ReactNode;
    position: 'right' | 'left';
  }[];
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
  toolbarExtensions,
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
        toolbarExtensions={toolbarExtensions}
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
  children?: React.ReactNode;
}

const QuestionEditor: React.FC<Props> = (props) => {
  const [postTitle, setTitle] = React.useState('');
  const [postType, setPostType] = React.useState<PostType>('quiz');

  const { qnaType, setQnaType, qnaOptions } = useQnaExtensionHooks();

  const [bodies, setBodies] = React.useState<string[]>(['']);
  const [bodyIndex, setBodyIndex] = React.useState(0);
  const [currentTags, setCurrentTags] = React.useState<TagType[]>([]);

  const workspaceSubspaceSelector = useWorkspaceSubspaceSelector(
    props.workspaceId,
    props.subspaceId
  );

  const tagRef = React.useRef<ManageTagsHandle>(null);

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

    const postTags = currentTags.map((ct) => ct.id);
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
      setBodies((state) =>
        state.map((body, i) => (i === bodyIndex ? val : body))
      );
    },
    [bodyIndex]
  );

  const qnaExtensionComp = React.useMemo(
    () => (
      <QnaExtension
        key={'qnaToolbar'}
        qnaType={qnaType}
        list={qnaOptions}
        onSelect={setQnaType}
      />
    ),
    [qnaType, setQnaType]
  );

  const tagsExtensionComp = React.useMemo(
    () => <TagsToolbarExtension key={'tagToolbar'} tags={currentTags} />,
    [currentTags]
  );

  const toolbarExtensions = React.useMemo(() => {
    const toolbar: {
      component: React.ReactNode;
      position: 'left' | 'right';
    }[] = [];
    if (postType === 'qna') {
      toolbar.push({ component: qnaExtensionComp, position: 'left' });
    }
    toolbar.push({ component: tagsExtensionComp, position: 'right' });

    return toolbar;
  }, [postType, qnaExtensionComp, tagsExtensionComp]);
  // Configure editor tabs here
  // Callback for when the tabs change
  React.useEffect(() => {
    if (postType === 'qna' && qnaType) {
      const index = qnaOptions.findIndex((option) => option.value === qnaType);
      if (index === -1) {
        return setBodyIndex(0);
      }

      if (bodies.length - 1 < index) {
        setBodies((state) => {
          const newState = [...state];
          for (let i = bodies.length; i <= index; i += 1) {
            newState.push('');
          }
          return newState;
        });
      }
      setBodyIndex(index);
    } else {
      return setBodyIndex(0);
    }
  }, [postType, qnaType]);

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
              className: 'flex-1 dark:bg-nord-0',
            }}
          />
          <PostTypeDropdown
            selectedPostType={postType}
            onSelect={(s) => setPostType(s as PostType)}
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
        <div className="flex flex-col flex-1">
          {postType !== 'quiz' && (
            <>
              <MarkdownEditor
                body={bodies[bodyIndex]}
                onBodyChange={onBodyChange}
                toolbarExtensions={toolbarExtensions}
                onPressTags={() => {
                  tagRef.current?.showModal();
                }}
              />
              <ManageTags
                ref={tagRef}
                onSubmitTags={(tags: TagType[]) => {
                  setCurrentTags(tags);
                }}
                workspaceId={workspaceSubspaceSelector.workspace.selectedId}
                subspaceId={workspaceSubspaceSelector.subspace.selectedId}
              />
              <button className={classes.submit} onClick={onSubmitCreatePost}>
                {`Post your ${postText}`}
              </button>
            </>
          )}
          {postType === 'quiz' && (
            <QuizBuilder
              workspaceId={workspaceSubspaceSelector.workspace.selectedId}
              subspaceId={workspaceSubspaceSelector.subspace.selectedId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;
