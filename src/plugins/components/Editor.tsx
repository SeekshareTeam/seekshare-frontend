import React from 'react';
import ReactDom from 'react-dom';
import SimpleMDE, { SimpleMDEReactProps } from 'react-simplemde-editor';

import Viewer, { Props as ViewerProps } from './Viewer';
import useDimensions from 'src/utils/use_dimensions';

import 'easymde/dist/easymde.min.css';

const getContainers = () => {
  const editor = document.getElementsByClassName('EasyMDEContainer');
  const codeMirror = document.getElementsByClassName('CodeMirror');
  const codeMirrorScroll = document.getElementsByClassName('CodeMirror-scroll');
  const preview = document.getElementsByClassName('editor-preview');
  const toolbar = document.getElementsByClassName('editor-toolbar');
  const scrollbar = document.getElementsByClassName('CodeMirror-vscrollbar');
  const iconEye = document.getElementsByClassName('fa-eye');
  const iconColumns = document.getElementsByClassName('fa-columns');
  const iconTag = document.getElementsByClassName('fa-tag');

  return {
    editor: [...editor]?.[0] as HTMLElement,
    codeMirror: [...codeMirror]?.[0] as HTMLElement,
    codeMirrorScroll: [...codeMirrorScroll]?.[0] as HTMLElement,
    preview: [...preview]?.[0] as HTMLElement,
    toolbar: [...toolbar]?.[0] as HTMLElement,
    scrollbar: [...scrollbar]?.[0] as HTMLElement,
    iconEye: [...iconEye]?.[0] as HTMLElement,
    iconColumns: [...iconColumns]?.[0] as HTMLElement,
    iconTag: [...iconTag]?.[0] as HTMLElement,
  };
};

interface TabItem {
  value: string;
  label: string;
}

// TODO: make the tab values generic
interface TabOption {
  list: TabItem[];
  selected: string;
  onSelect: (_: string) => void;
}

export interface Props
  extends Pick<SimpleMDEReactProps, 'value' | 'onChange' | 'options'> {
  viewerProps?: Partial<ViewerProps>;
  onPressTags?: () => void;
  tabOption?: TabOption;
  toolbarExtensions?: React.ReactNode[];
}

const Editor: React.FC<Props> = (props) => {
  const [previewMode, setPreviewMode] = React.useState('hidden');
  const [containers, setContainers] = React.useState<
    ReturnType<typeof getContainers>
  >(getContainers());

  const dimensions = useDimensions();

  React.useEffect(() => {
    setTimeout(() => {
      setContainers(getContainers());
    }, 0);
  }, []);

  const setHeight = React.useCallback(
    (height) => {
      // prevent the editor from expanding in height
      if (containers.codeMirrorScroll) {
        containers.codeMirrorScroll.style.maxHeight = `${height}px`;
      }

      // prevent the preview div from expanding
      if (containers.preview) {
        containers.preview.style.maxHeight = `${height}px`;
      }
    },
    [containers]
  );

  // for dark mode
  React.useEffect(() => {
    // remove weird white space around the editor
    if (containers.codeMirror) {
      containers.codeMirror.style.padding = '0';
    }

    containers.codeMirrorScroll?.classList.add('dark:bg-slate-900');
    containers.codeMirrorScroll?.classList.add('dark:px-2');
    containers.iconEye?.classList.add('dark:text-white');
    containers.iconColumns?.classList.add('dark:text-white');
    containers.iconTag?.classList.add('dark:text-white');

    setTimeout(() => {
      setHeight(containers.codeMirror?.offsetHeight ?? 0);
    }, 0);
  }, [containers]);

  // update the content size if the window size change
  React.useEffect(() => {
    setTimeout(() => setHeight(containers.codeMirror?.offsetHeight ?? 0), 0);
  }, [dimensions[1]]);

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

  // We want to place the tabs before the toolbar items and createPortal
  // only appends it (is we prepend in this case)
  const toolbarPortal = React.useRef(document.createElement('div'));

  React.useEffect(() => {
    if (props.toolbarExtensions) {
      containers.toolbar?.append(toolbarPortal.current);
      if (containers.toolbar) {
        containers.toolbar.style.display = 'flex';
      }
    } else {
      try {
        containers.toolbar?.removeChild(toolbarPortal.current);
      } catch {}
    }
    return () => {
      try {
        containers.toolbar?.removeChild(toolbarPortal.current);
      } catch {}
    };
  }, [props.toolbarExtensions, containers.toolbar]);

  const options = React.useMemo(() => {
    const tb = props.options?.toolbar;

    const toolbar = [
      ...(Array.isArray(tb) ? tb : []),
      {
        name: 'preview',
        action: () =>
          setPreviewMode((mode) => (mode === 'full' ? 'hidden' : 'full')),
        className: 'fa fa-eye no-disable',
        title: 'Toggle Preview',
      },
      {
        name: 'side-by-side',
        action: () =>
          setPreviewMode((mode) => (mode === 'side' ? 'hidden' : 'side')),
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
      toolbar,
      // scrollbarStyle: 'null',
      ...(props.options || {}),
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
      {props.toolbarExtensions != null && (
        <TabContainer container={toolbarPortal.current}>
          <div className={'flex flex-1'}>{props.toolbarExtensions}</div>
        </TabContainer>
      )}

      {props.tabOption != null && (
        <TabContainer container={toolbarPortal.current}>
          <div className="flex flex-row flex-1">
            {props.tabOption?.list.map((item) => (
              <div
                key={item.value}
                className="py-0.5 px-2"
                style={{
                  color:
                    props.tabOption?.selected === item.value
                      ? 'white'
                      : '#91A699',
                  backgroundColor:
                    props.tabOption?.selected === item.value
                      ? '#91A699'
                      : '#232325',
                }}
                onClick={() => props.tabOption?.onSelect(item.value)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </TabContainer>
      )}
    </React.Fragment>
  );
};

interface PortalProps {
  container?: Element;
}

const Full: React.FC<PortalProps> = (props) => {
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

const Side: React.FC<PortalProps> = (props) => {
  if (!props.container) {
    return null;
  }

  return ReactDom.createPortal(props.children, props.container);
};

const TabContainer: React.FC<PortalProps> = (props) => {
  if (!props.container) {
    return null;
  }

  return ReactDom.createPortal(props.children, props.container);
};

export default Editor;
