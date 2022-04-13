import React from 'react';
import ReactDom from 'react-dom';
import SimpleMDE, { SimpleMDEReactProps } from 'react-simplemde-editor';

import Viewer, { Props as ViewerProps } from './Viewer';

import 'easymde/dist/easymde.min.css';

const getContainers = () => {
  let editor = document.getElementsByClassName('EasyMDEContainer');
  let codeMirror = document.getElementsByClassName('CodeMirror');
  let preview = document.getElementsByClassName('editor-preview');
  let toolbar = document.getElementsByClassName('editor-toolbar');

  return {
    editor: [...editor]?.[0],
    codeMirror: [...codeMirror]?.[0],
    preview: [...preview]?.[0],
    toolbar: [...toolbar]?.[0],
  };
};

interface Props
  extends Pick<SimpleMDEReactProps, 'value' | 'onChange' | 'options'> {
  viewerProps?: Partial<ViewerProps>;
}

const Editor: React.FC<Props> = props => {
  const [previewMode, setPreviewMode] = React.useState('hidden');
  const [containers, setContainers] = React.useState<
    ReturnType<typeof getContainers>
  >(getContainers());

  React.useEffect(() => {
    setTimeout(() => {
      setContainers(getContainers());
    }, 0);
  }, []);

  React.useEffect(() => {
    if (previewMode === 'side') {
      setTimeout(() => {
        containers.toolbar?.classList.remove('disable-for-preview');

        containers.editor?.classList.add('sided--no-fullscreen');
        containers.preview?.classList.add('editor-preview-active-side');
        containers.codeMirror?.classList.add('CodeMirror-sided');
      }, 0);
    } else if (previewMode === 'full') {
      setTimeout(() => {
        containers.editor?.classList.remove('sided--no-fullscreen');
        containers.preview?.classList.remove('editor-preview-active-side');
        containers.codeMirror?.classList.remove('CodeMirror-sided');

        containers.toolbar?.classList.add('disabled-for-preview');
      }, 0);
    } else if (previewMode === 'hidden') {
      setTimeout(() => {
        containers.editor?.classList.remove('sided--no-fullscreen');
        containers.preview?.classList.remove('editor-preview-active-side');
        containers.codeMirror?.classList.remove('CodeMirror-sided');
        containers.toolbar?.classList.remove('disable-for-preview');
      }, 0);
    }
  }, [previewMode]);

  const options = React.useMemo(() => {
    const tb = props.options?.toolbar;
    return {
      ...(props.options || {}),
      toolbar: [
        ...(Array.isArray(tb) ? tb : []),
        {
          name: 'preview',
          action: () =>
            setPreviewMode(mode => (mode === 'full' ? 'hidden' : 'full')),
          className: 'fa fa-eye no-disable',
          title: 'Toggle Preview',
        },
        {
          name: 'side-by-side',
          action: () =>
            setPreviewMode(mode => (mode === 'side' ? 'hidden' : 'side')),
          className: 'fa fa-columns no-disable no-mobile',
          title: 'Toggle Side by Side',
        },
      ],
    };
  }, [props.options]);

  return (
    <React.Fragment>
      <SimpleMDE
        options={options}
        value={props.value}
        onChange={props.onChange}
      />
      {previewMode === 'full' && (
        <Full container={containers.codeMirror}>
          <Viewer
            mode="write"
            text={props.value || ''}
            {...(props.viewerProps || {})}
          />
        </Full>
      )}
      {previewMode === 'side' && (
        <Side container={containers.preview}>
          <Viewer
            mode="write"
            text={props.value || ''}
            {...(props.viewerProps || {})}
          />
        </Side>
      )}
    </React.Fragment>
  );
};

interface PreviewProps {
  container?: Element;
}

const Full: React.FC<PreviewProps> = props => {
  if (!props.container) {
    return null;
  }
  return ReactDom.createPortal(
    <div className="editor-preview-full editor-preview editor-preview-active">
      {props.children}
    </div>,
    props.container,
  );
};

const Side: React.FC<PreviewProps> = props => {
  if (!props.container) {
    return null;
  }

  return ReactDom.createPortal(props.children, props.container);
};

export default Editor;
