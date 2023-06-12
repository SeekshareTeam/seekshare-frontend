import { useMemo } from 'react';

import type { MilkdownPlugin } from '@milkdown/ctx';
import { $view } from '@milkdown/utils';
import { math, mathBlockSchema } from '@milkdown/plugin-math';

import MathBlock from './MathBlock';
import type { NodeViewFactory } from './types';

const mathPlugin: (_: NodeViewFactory) => MilkdownPlugin[] = (
  nodeViewFactory
) =>
  useMemo(() => {
    return [
      $view(mathBlockSchema.node, () =>
        nodeViewFactory({
          component: MathBlock,
          stopEvent: () => true,
        })
      ),
      math,
    ].flat();
  }, [nodeViewFactory]);

export default mathPlugin;
