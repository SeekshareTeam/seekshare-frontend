import { visit } from 'unist-util-visit';
import type { Root } from 'hast';

function rehypeRemovePre() {
  return (tree: Root) => {
    visit(tree, 'element', node => {
      if (node.tagName === 'pre' && node.children.length > 0) {
        Object.assign(node, node.children[0]);
      }
    });
  };
}

export default rehypeRemovePre;
