import * as React from 'react';
import ReactDom from 'react-dom';

import Viewer from './Viewer';

import SimpleMDE, { SimpleMDEReactProps } from 'react-simplemde-editor';

const useContainerRef = (isPreview?: boolean) => {
  const codemirrorRef: React.MutableRefObject<null | HTMLElement> =
    React.useRef<null | HTMLElement>(null);

  const refCallback = React.useCallback(
    (node: any) => {
      if (node) {
        const codeMirror = node.querySelector('div.CodeMirror');
        const codeMirrorScroll = node.querySelector('div.CodeMirror-scroll');
        const preview = node.querySelector('div.editor-preview');
        const toolbar = node.querySelector('div.editor-toolbar');
        const iconEye = node.querySelector('i.fa-eye');
        const iconColumns = node.querySelector('i.fa-columns');
        const iconTag = node.querySelector('i.fa-tag');
        const footer = node.querySelector('div.editor-statusbar');

        if (codeMirror) {
          codeMirror.style.padding = '0';
          codeMirror.style.border = 0;
        }

        toolbar?.classList.add('hidden');
        footer?.classList.add('hidden');
        codeMirrorScroll?.classList.add('dark:bg-nord-0');
        codeMirrorScroll?.classList.add('dark:px-2');
        codeMirror?.classList.add('dark:text-nord-6');

        iconEye?.classList.add('dark:text-nord-6');
        iconColumns?.classList.add('dark:text-nord-6');
        iconTag?.classList.add('dark:text-nord-6');

        const setHeight = (height: number) => {
          // prevent the editor from expanding in height
          if (codeMirrorScroll) {
            codeMirrorScroll.style.maxHeight = `${height}px`;
          }

          // prevent the preview div from expanding
          if (preview) {
            preview.style.maxHeight = `${height}px`;
          }
        };

        setTimeout(() => {
          setHeight(codeMirror?.offsetHeight ?? 0);
        }, 0);

        setTimeout(() => {
          codemirrorRef.current = codeMirror;
        }, 0);
      }
    },
    [isPreview]
  );

  return [codemirrorRef, refCallback];
};

const useOptions = <T,>(
  options: T,
  setPreviewMode: (mode: string | ((val: string) => string)) => void
) => {
  return React.useMemo(() => {
    const toolbar = [
      {
        name: 'preview',
        action: () =>
          setPreviewMode((mode) => (mode === 'full' ? 'hidden' : 'full')),
        className: 'fa fa-eye no-disable',
        title: 'Toggle Preview',
      },
    ];

    return {
      toolbar,
      // scrollbarStyle: 'null',
      ...(options || {}),
    };
  }, [options]);
};

interface Props
  extends Pick<SimpleMDEReactProps, 'value' | 'onChange' | 'options'> {}

const PortableEditor: React.FC<Props> = (props) => {
  const [previewMode, setPreviewMode] = React.useState('hidden');

  const [containerRef, containerRefCallback] = useContainerRef();
  const options = useOptions<typeof props.options>(
    props.options,
    setPreviewMode
  );

  // We retain the SimpleMDE
  return (
    <div>
      <SimpleMDE
        ref={containerRefCallback as (node: any) => void}
        options={options}
        onChange={props.onChange}
        value={props.value}
      />
      {previewMode === 'full' &&
        !!(containerRef as React.MutableRefObject<HTMLElement | null>)
          .current && (
          <Full
            parentRef={
              (containerRef as React.MutableRefObject<HTMLElement>).current
            }
          >
            <Viewer mode="write" text={props.value || ''} />
          </Full>
        )}
    </div>
  );
};

const Full: React.FC<{ parentRef: HTMLElement; children?: React.ReactNode }> = (
  props
) => {
  return ReactDom.createPortal(
    <div
      id="seekshare-preview-full"
      className="editor-preview-full editor-preview editor-preview-active"
    >
      {props.children}
    </div>,
    props.parentRef
  );
};

export default PortableEditor;
