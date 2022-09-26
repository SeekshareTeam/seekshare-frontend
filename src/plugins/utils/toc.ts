import React from 'react';

export interface Header {
  id: string;
  text: string;
  depth: number;
  parent: string;
}

export const useHeaders = (text: string) => {
  const [headers, setHeaders] = React.useState<Header[]>([]);
  React.useEffect(() => {
    // get headers
    const elements = Array.from(
      document.querySelectorAll('h1, h2, h3, h4, h5, h6'),
    )
      .filter(element => element.id)
      .map(element => ({
        id: element.id,
        text: element.textContent || '',
        depth: Number(element.tagName.substring(1)),
        parent: '',
      }));

    // set the parent header
    const stack: Header[] = [];
    elements.forEach(header => {
      while (
        stack.length > 0 &&
        stack[stack.length - 1].depth >= header.depth
      ) {
        stack.pop();
      }

      if (stack.length > 0) {
        header.parent = stack[stack.length - 1].id;
      }

      stack.push(header);
    });

    setHeaders(elements);
  }, [text]);

  return headers;
};

export const useScroll = (
  ids: string[],
  options: ConstructorParameters<typeof IntersectionObserver>[1],
) => {
  const [activeId, setActiveId] = React.useState<string>();
  const observer = React.useRef<IntersectionObserver>();

  React.useEffect(() => {
    const elements = ids.map(id => document.getElementById(id));
    observer.current?.disconnect();

    observer.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry?.isIntersecting && entry?.intersectionRatio >= 1) {
          setActiveId(entry.target.id);
        }
      }, options);
    });

    elements.forEach(element => {
      if (element) {
        observer.current?.observe(element);
      }
    });

    return () => observer.current?.disconnect();
  }, [ids, options]);

  return activeId;
};

export const getActiveIds = (headers: Header[], activeId: string) => {
  const activeIds = { [activeId]: true };

  const headersById = headers.reduce<{ [key: string]: Header }>(
    (acc, header) => {
      acc[header.id] = header;
      return acc;
    },
    {},
  );

  let parentId = headersById[activeId]?.parent;
  while (parentId) {
    activeIds[parentId] = true;
    parentId = headersById[parentId].parent
  }

  return activeIds
};

