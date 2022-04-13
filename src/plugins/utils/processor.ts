import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import rehypePToSpan from './rehype_p_to_span';

const processor = remark()
  .use(remarkParse)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypePToSpan)
  .use(rehypeKatex)
  .use(rehypeStringify);

const toHtml = (text: string) => {
  return processor.processSync(text).toString();
};

export default toHtml;
