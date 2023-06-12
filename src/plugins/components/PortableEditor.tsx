import * as React from 'react';
import ReactDom from 'react-dom';

import Viewer from './Viewer';

import SimpleMDE, { SimpleMDEReactProps } from 'react-simplemde-editor';

const useContainerRef = (isPreview?: boolean) => {
  const codemirrorRef = React.useRef<null | HTMLElement>(null);

  const refCallback = React.useCallback(() => {
    const codeMirror = document.querySelector(
      'div.CodeMirror'
    ) as HTMLDivElement;
    const codeMirrorScroll = document.querySelector(
      'div.CodeMirror-scroll'
    ) as HTMLDivElement;
    const preview = document.querySelector(
      'div.editor-preview'
    ) as HTMLDivElement;
    const toolbar = document.querySelector(
      'div.editor-toolbar'
    ) as HTMLDivElement;
    const iconEye = document.querySelector('i.fa-eye') as HTMLDivElement;
    const iconColumns = document.querySelector(
      'i.fa-columns'
    ) as HTMLDivElement;
    const iconTag = document.querySelector('i.fa-tag') as HTMLDivElement;
    const footer = document.querySelector(
      'div.editor-statusbar'
    ) as HTMLDivElement;

    if (codeMirror) {
      codeMirror.style.padding = '0';
      codeMirror.style.border = '0';
    }

    toolbar?.classList.add('hidden');
    footer?.classList.add('hidden');
    codeMirrorScroll?.classList.add('dark:bg-night-dark');
    codeMirrorScroll?.classList.add('dark:px-2');

    iconEye?.classList.add('dark:text-darkpen-medium');
    iconColumns?.classList.add('dark:text-darkpen-medium');
    iconTag?.classList.add('dark:text-darkpen-medium');

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
  }, [isPreview]);

  return [codemirrorRef, refCallback] as const;
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

type Props = Pick<SimpleMDEReactProps, 'value' | 'onChange' | 'options'>;

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
        ref={containerRefCallback}
        options={options}
        onChange={props.onChange}
        value={props.value}
      />
      {previewMode === 'full' && !!containerRef.current && (
        <Full parentRef={containerRef.current}>
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
