import React from 'react';
import ReactDom from 'react-dom';
import SimpleMDE, { SimpleMDEReactProps } from 'react-simplemde-editor';

import Viewer, { Props as ViewerProps } from './Viewer';

import 'easymde/dist/easymde.min.css';

const getContainers = () => {
  const editor = document.getElementsByClassName('EasyMDEContainer');
  const codeMirror = document.getElementsByClassName('CodeMirror');
  const codeMirrorScroll = document.getElementsByClassName('CodeMirror-scroll');
  const preview = document.getElementsByClassName('editor-preview');
  const toolbar = document.getElementsByClassName('editor-toolbar');
  const iconEye = document.getElementsByClassName('fa-eye');
  const iconColumns = document.getElementsByClassName('fa-columns');
  const iconTag = document.getElementsByClassName('fa-tag');

  return {
    editor: [...editor]?.[0] as HTMLElement,
    codeMirror: [...codeMirror]?.[0] as HTMLElement,
    codeMirrorScroll: [...codeMirrorScroll]?.[0] as HTMLElement,
    preview: [...preview]?.[0] as HTMLElement,
    toolbar: [...toolbar]?.[0] as HTMLElement,
    iconEye: [...iconEye]?.[0] as HTMLElement,
    iconColumns: [...iconColumns]?.[0] as HTMLElement,
    iconTag: [...iconTag]?.[0] as HTMLElement,
  };
};

interface Props
  extends Pick<SimpleMDEReactProps, 'value' | 'onChange' | 'options'> {
  viewerProps?: Partial<ViewerProps>;
  onPressTags?: () => void;
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

  // for dark mode
  React.useEffect(() => {
    // remove weird white space around the editor
    if (containers.codeMirror) {
      containers.codeMirror.style.padding = '0';
    }

    containers.codeMirrorScroll?.classList.add('dark:bg-slate-900');
    containers.codeMirrorScroll?.classList.add('dark:p-2');
    containers.iconEye?.classList.add('dark:text-white');
    containers.iconColumns?.classList.add('dark:text-white');
    containers.iconTag?.classList.add('dark:text-white');

    setTimeout(() => {
      // prevent the editor from expanding in height
      if (containers.codeMirrorScroll) {
        containers.codeMirrorScroll.style.maxHeight = `${
          containers.codeMirror?.offsetHeight ?? 0
        }px`;
      }

      // prevent the preview div from expanding
      if (containers.preview) {
        containers.preview.style.maxHeight = `${
          containers.codeMirror?.offsetHeight ?? 0
        }px`;
      }
    }, 0);
  }, [containers]);

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

    const toolbar = [
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
    ];

    if (props.onPressTags) {
      toolbar.push('|', {
        name: 'tags',
        action: props.onPressTags,
        className: 'fa fa-regular fa-tag no-disable',
        title: 'Manage Tags',
      });
    }
    return {
      ...(props.options || {}),
      toolbar,
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
            displayToc
            {...(props.viewerProps || {})}
          />
        </Full>
      )}
      {previewMode === 'side' && (
        <Side container={containers.preview}>
          <Viewer
            mode="read"
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
    <div
      id="seekshare-preview-full"
      className="editor-preview-full editor-preview editor-preview-active"
    >
      {props.children}
    </div>,
    props.container
  );
};

const Side: React.FC<PreviewProps> = props => {
  if (!props.container) {
    return null;
  }

  return ReactDom.createPortal(props.children, props.container);
};

export default Editor;
