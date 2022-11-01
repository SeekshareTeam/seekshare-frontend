import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';

import rehypeRemovePre from '../utils/rehype_remove_pre';

import codeblockRender, { ComponentProps } from '../utils/codeblock_render';

import type { Editable, Saveable } from '../utils/traits';
import type { SavedComponents } from '../utils/types';

import TableOfContents from '../components/TableOfContents';
import { useHeaders } from '../utils/toc';

// import 'katex/dist/katex.min.css';
// import './Viewer.css';

const remarkPlugins = [remarkMath];
const rehypePlugins = [rehypeKatex, rehypeSlug, rehypeRemovePre];

export interface Props extends Editable {
  text: string;
  displayToc?: boolean;
  componentProps?: Partial<ComponentProps>;
  savedComponents?: SavedComponents<keyof ComponentProps>;
  onSaveComponent?: Saveable<string>['onSubmit'];
}

const MarkdownViewer: React.FC<Props> = props => {
  const headers = useHeaders(props.text);
  const [showToc, setShowToc] = React.useState(false);

  const codeblock = React.useMemo(() => {
    return codeblockRender({
      mode: props.mode,
      componentProps: props.componentProps,
      savedComponents: props.savedComponents,
      onSaveComponent: props.onSaveComponent,
    });
  }, [
    props.mode,
    props.componentProps,
    props.savedComponents,
    props.onSaveComponent,
  ]);

  return (
    <>
      {props.displayToc && (
        <div className="viewer-toc">
          <TableOfContents headers={headers} />
        </div>
      )}
      <div className="bg-inherit">
        <div id="viewer-content" className="bg-inherit">
          <ReactMarkdown
            children={props.text}
            remarkPlugins={remarkPlugins}
            rehypePlugins={rehypePlugins}
            components={{
              code: codeblock,
            }}
          />
        </div>
      </div>
      {props.displayToc && (
        <div className="viewer-toc-bottom">
          {showToc && (
            <div className="viewer-toc-panel">
              <TableOfContents headers={headers} />
            </div>
          )}
          <div
            className="viewer-toc-button"
            onClick={() => setShowToc(state => !state)}
          />
        </div>
      )}
    </>
  );
};

export default MarkdownViewer;

