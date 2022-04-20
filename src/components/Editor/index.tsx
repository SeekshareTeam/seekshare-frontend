import text from './text.json';

import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';

import { isEmpty } from 'lodash';
// import SimpleMDE from 'react-simplemde-editor';
import React from 'react';
// import Link from 'next/Link';
import { useRouter } from 'next/router';
import ReactDOMServer from 'react-dom/server';
import { MarkdownViewer } from 'src/components/Viewer';
import { useAppDispatch } from 'src/modules/Redux';
import { useCreatePostMutation } from 'src/generated/apollo';
import { TitleInput, Title } from 'src/components/Input';
import { TagInput } from 'src/components/Input/Tag';
import { setLoading } from 'src/modules/App/slice';

const classes = {
  editorContainer:
    'w-full flex flex-col justify-center',
  main: 'w-2/3 card p-2 self-center',
  title:
    'appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300',
  submit:
    'mt-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-48',
  provideTag: '',
};

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

type MarkdownEditorProps = {
  onBodyChange: (val: string) => void;
  body: string;
  size?: string;
  onSubmit?: (body: string) => Promise<void>;
  type?: string;
  tabNode?: React.ReactNode;
};

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  onBodyChange,
  body,
  size,
  onSubmit,
  type,
  tabNode,
}: MarkdownEditorProps) => {
  let height: string = '500px';

  switch (size) {
    case 'large':
      height = '400px';
      break;
    case 'medium':
      height = '300px';
      break;
    case 'small':
      height = '150px';
      break;
    case 'xs':
      height = '100px';
      break;
    default:
      height = '500px';
      break;
  }

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      sideBySideFullscreen: false,
      maxHeight: height,
      previewRender: (text: string) => {
        return ReactDOMServer.renderToString(<MarkdownViewer text={text} />);
      },
    }),
    []
  );

  return (
    <div className="w-full">
      {tabNode}
      <SimpleMDE
        options={options}
        value={body}
        onChange={onBodyChange}
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

const QuestionEditor: React.FC = () => {
  const [postTitle, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [currentTags, setCurrentTags] = React.useState<
    {
      value: string;
      id: string;
    }[]
  >([]);

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
    const postTags = currentTags.map((ct) => ct.id);
    const result = await createPostMutation({
      variables: {
        postInput: {
          body,
          title: postTitle,
          type: 'question',
          tags: postTags,
          workspaceId: 'c73dad3a-3f7d-453d-9a4d-4b72389551a8',
          subspaceId: '03640067-61a9-4e2a-8dc0-7264111dbfb1',
        },
      },
    });

    console.log('@ result of create post ', result);

    if (result?.data?.createPost?.postId) {
      router.push('/post/' + result.data.createPost.postId);
    }
    // if (data?.postId) {
    //   router.push('/post/' + data.postId);
    // }
  }, [body, postTitle, currentTags]);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onBodyChange = (val: string) => {
    setBody(val);
  };

  return (
    <div className="justify-center w-full">
      <div className={classes.editorContainer}>
        <div className={classes.main}>
          <TitleInput
            title={text.title}
            inputProps={{ onChange: onTitleChange, value: postTitle }}
          />
          <Title value={text.body} />
          <MarkdownEditor body={body} onBodyChange={onBodyChange} />
          <Title value={'Tags'} />
          <TagInput
            currentTags={currentTags}
            setCurrentTags={(val) => {
              setCurrentTags(val);
            }}
          />
          <div className={classes.submit}>
            <button onClick={onSubmitCreatePost}>{'Post your question'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;
