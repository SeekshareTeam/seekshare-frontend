import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import ReactMarkdown from 'react-markdown';
import 'katex/dist/katex.min.css';
import 'katex/dist/contrib/mhchem.js';

export const MarkdownViewer = ({ text }: { text: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
    >
      {text}
    </ReactMarkdown>
  );
};
