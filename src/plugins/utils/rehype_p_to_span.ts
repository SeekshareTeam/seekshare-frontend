import { visit } from 'unist-util-visit';
import type { Root } from 'hast';

function rehypePToSpan() {
  return (tree: Root) => {
    visit(tree, 'element', node => {
      if (node.tagName === 'p') {
        Object.assign(node, { tagName: 'span' });
      }
    });
  };
}

export default rehypePToSpan;
