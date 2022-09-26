import React from 'react';

import { getActiveIds, useScroll, Header } from 'src/plugins/utils/toc';

interface Props {
  headers: Header[];
}

const TableOfContents: React.FC<Props> = props => {
  const activeId = useScroll(
    props.headers.map(h => h.id),
    {
      root: document.getElementById('seekshare-preview-full'),
      // rootMargin: '0px 0px -200px 0px',
      threshold: 1,
    },
  );

  const activeIds = getActiveIds(props.headers, activeId || '');

  if (props.headers.length === 0) {
    return null;
  }
  return (
    <nav>
      <ul style={{ listStyleType: 'none' }}>
        {props.headers.map(header => (
          <li
            key={header.id}
            style={{
              marginLeft: `${header.depth - 1}em`,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            <a
              href={`#${header.id}`}
              style={{
                textDecoration: 'none',
                fontWeight: activeIds[header.id] ? 'bold' : 'normal',
              }}
            >
              {header.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;

