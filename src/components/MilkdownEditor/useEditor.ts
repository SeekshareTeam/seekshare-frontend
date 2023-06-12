import { Editor, editorViewOptionsCtx, rootCtx } from '@milkdown/core';
import { useEditor as useMilkdownEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { commonmark } from '@milkdown/preset-commonmark';
import { listener, listenerCtx } from '@milkdown/plugin-listener';

import {
  useNodeViewFactory,
  // usePluginViewFactory,
  // useWidgetViewFactory,
} from '@prosemirror-adapter/react';

import useMathPlugin from './plugins/math/useMathPlugin';

const useEditor = () => {
  // const pluginViewFactory = usePluginViewFactory();
  const nodeViewFactory = useNodeViewFactory();
  // const widgetViewFactory = useWidgetViewFactory();

  const mathPlugin = useMathPlugin(nodeViewFactory);

  const editorInfo = useMilkdownEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          attributes: {
            class: 'prose mx-auto px-2 py-4 box-border',
          },
        }));
        ctx.set(rootCtx, root);
        ctx.get(listenerCtx);
      })
      .config(nord)
      .use(commonmark)
      .use(listener)
      .use(mathPlugin)
  );

  // TODO: remove line
  editorInfo;
};

export default useEditor;
