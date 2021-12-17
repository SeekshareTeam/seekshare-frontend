import text from './text.json';

import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';

import { isEmpty } from 'lodash';
// import SimpleMDE from 'react-simplemde-editor';
import { shallowEqual } from 'react-redux';
// import { createPost } from 'src/modules/PostList/slice';
import React from 'react';
// import Link from 'next/Link';
import { useRouter } from 'next/router';
import ReactDOMServer from 'react-dom/server';
import { MarkdownViewer } from 'src/components/Viewer';
import { useCustomMutation, useAppSelector } from 'src/modules/Redux';
import { useCreatePostMutation } from 'src/generated/apollo';
import { TitleInput, Title } from 'src/components/Input';
import { createPost } from 'src/modules/Post/slice';

const classes = {
  editorContainer: 'w-2/3 flex flex-col justify-center',
  main: 'flex-1 card shadow-2xl p-2',
  title:
    'appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300',
  submit:
    'mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-48',
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
        className="border-2 border-blue-200"
        options={options}
        value={body}
        onChange={onBodyChange}
      />
      {type === 'comment' && (
        <div
          className={`bg-blue-400 ${
            !isEmpty(body) ? 'hover:bg-blue-600' : ''
          } text-white font-bold py-1 px-1 inline-block float-right`}
        >
          <button
            disabled={isEmpty(body)}
            onClick={async () => {
              console.log('body');
              if (onSubmit) {
                await onSubmit(body);
              }
            }}
          >
            {'Post Your Comment'}
          </button>
        </div>
      )}
    </div>
  );
};

const QuestionEditor: React.FC = () => {
  const [postTitle, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  // const [singleTag, setSingleTag] = React.useState('');
  // const [tags, setTags] = React.useState([]);

  // counter
  // const [counter, setCounter] = React.useState(0);

  const createPostMutation = useCustomMutation<
    typeof createPost,
    typeof useCreatePostMutation
  >(createPost, useCreatePostMutation, undefined, false);

  const router = useRouter();

  const { data } = useAppSelector((state) => state.post, shallowEqual);

  React.useEffect(() => {
    if (data) {
      console.log('@ d', data);
      // router.push('/post/' + data.post_id);
    }
  }, [data]);

  const onSubmitCreatePost = React.useCallback(async () => {
    console.log('clicked');
    await createPostMutation({
      variables: { body, title: postTitle, type: 'question' },
    });

    console.log('@@ data', data?.post_id);
    if (data?.post_id) {
      router.push('/post/' + data.post_id);
    }
  }, [data, body, postTitle]);

  // const onSingleTagChange = (e) => {
  //   setSingleTag(e.target.value);
  // };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onBodyChange = (val: string) => {
    setBody(val);
  };

  return (
    <div className={classes.editorContainer}>
      <div className={classes.main}>
        <TitleInput
          title={text.title}
          inputProps={{ onChange: onTitleChange, value: postTitle }}
        />
        <Title value={text.body} />
        <MarkdownEditor body={body} onBodyChange={onBodyChange} />
      </div>
      <div className={classes.submit}>
        <button onClick={onSubmitCreatePost}>{'Post your question'}</button>
      </div>
    </div>
  );
};

export default QuestionEditor;
