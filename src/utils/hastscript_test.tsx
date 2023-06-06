import { read } from 'to-vfile';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

const sampleText = `
# hello


:::sampleDirective

What could it be

:::

`;

const SampleComponent = ({ valueText }) => {
  return (
    <div className="bg-red-700">
      <p className="text-darkpen-medium">{valueText}</p>
    </div>
  );
};

export const runCommand = async () => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    // .use(myRemarkPlugin)
    // .use(myJsxPlugin)
    // .use(rehypeFormat)
    // .use(rehypeStringify)
    .parse(sampleText);

  const file2 = await unified()
    .use(myRemarkPlugin)
    .use(remarkRehype)
    .use(myJsxPlugin)
    // .use(printTree)
    // .use(rehypeFormat)
    // .use(rehypeStringify)
    .runSync(file);

  // const file = await unified()
  //   .use(remarkParse)
  //   .use(remarkDirective)
  //   .use(myRemarkPlugin)
  //   .use(remarkRehype)
  //   .use(myJsxPlugin)
  //   // .use(printTree)
  //   // .use(rehypeFormat)
  //   // .use(rehypeStringify)
  //   .runSync(sampleText);

  console.log('@@@ file', file2);

  return file2;
};

// This plugin is an example to let users write HTML with directives.
// It’s informative but rather useless.
// See below for others examples.
/** @type {import('unified').Plugin<[], import('mdast').Root>} */
function myRemarkPlugin() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        const data = node.data || (node.data = {});
        const hast = h(node.name, {
          valueText: 'This is a sample component',
        });

        console.log('@@@ hast', hast);

        data.hName = hast.tagName;
        data.hProperties = hast.properties;
      }
    });
  };
}

function printTree() {
  return (tree) => {
    console.log('@@@ tree', tree);
  };
}

function myJsxPlugin() {
  return (tree) => {
    const result = toJsxRuntime(tree, {
      Fragment,
      jsx,
      jsxs,
      components: {
        sampleDirective: (props) => <SampleComponent {...props} />,
        'sampledirective': SampleComponent,
        'sampledirective-0': SampleComponent,
      },
    });

    console.log('@@@ result', result);
    return result;
  };
}
