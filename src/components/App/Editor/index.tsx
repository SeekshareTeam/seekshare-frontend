import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
// import SimpleMDE from 'react-simplemde-editor';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import { createPost } from 'src/modules/PostList/slice';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactDOMServer from 'react-dom/server';
import { MarkdownViewer } from 'src/components/App/Viewer';
import { useCustomQuery } from 'src/modules/Redux/index';
import { useCreatePostMutation } from 'src/generated/apollo';
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

const Editor = ({ value, onChange }) => {
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [singleTag, setSingleTag] = React.useState('');
  const [tags, setTags] = React.useState([]);

  // counter
  const [counter, setCounter] = React.useState(0);

  const createPostMutation = useCustomQuery<typeof useCreatePostMutation>(
    createPost,
    useCreatePostMutation,
    undefined,
    // { title, body, type: 'question' },
    false
  );

  // const useCreatePostMutation = useCreatePostMutation({ title, body, type: 'question' })
  // const [mutationQuery, { data: mutationData }] = useCreatePostMutation();

  const { data } = useSelector(state => (state.post), shallowEqual);

  if (data) {
    console.log('@ received a brand new post', post);
  }

  const router = useRouter();

  const onSubmitCreatePost = () => {
    // console.log('@ b', title, body);
    // dispatch(
    //   createPost({
    //     title,
    //     body,
    //     pid: counter.toString(),
    //   })
    // );

    // will this even work - let's see.
    createPostMutation({ variables: { body, title, type: 'question' } });

    setCounter(counter + 1);

    // router.push('/posts');
  };

  const onSingleTagChange = (e) => {
    setSingleTag(e.target.value);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onBodyChange = (val) => {
    setBody(val);
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      sideBySideFullscreen: false,
      maxHeight: '300px',
      previewRender: (text) => {
        return ReactDOMServer.renderToString(<MarkdownViewer text={text} />);
      },
    }),
    []
  );

  return (
    <div className={classes.editorContainer}>
      <div className={classes.main}>
        <h1>
          <b>{'Title'}</b>
        </h1>
        <input
          type="text"
          className={classes.title}
          value={title}
          onChange={onTitleChange}
        />
        <h1>
          <b>{'Body / Question'}</b>
        </h1>
        <SimpleMDE options={options} value={body} onChange={onBodyChange} />
        <h1>
          <b>{'Tags'}</b>
        </h1>
        <input
          type="text"
          className={classes.title}
          value={singleTag}
          onChange={onSingleTagChange}
        />
        <button className={''} />
      </div>
      <div className={classes.submit}>
        <button onClick={onSubmitCreatePost}>{'Post your question'}</button>
      </div>
    </div>
  );
};

export default Editor;
