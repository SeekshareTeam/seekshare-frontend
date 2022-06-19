import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRemovePre from '../utils/rehype_remove_pre';

import codeblockRender, { ComponentProps } from '../utils/codeblock_render';

import type { Editable, Saveable } from '../utils/traits';
import type { SavedComponents } from '../utils/types';

import 'katex/dist/katex.min.css';

const remarkPlugins = [remarkMath];
const rehypePlugins = [rehypeKatex, rehypeRemovePre];

export interface Props extends Editable {
  text: string;
  componentProps?: Partial<ComponentProps>;
  savedComponents?: SavedComponents<keyof ComponentProps>;
  onSaveComponent?: Saveable<string>['onSubmit'];
}

const MarkdownViewer: React.FC<Props> = props => {
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
    <ReactMarkdown
      children={props.text}
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      components={{
        code: codeblock,
      }}
    />
  );
};

export default MarkdownViewer;
