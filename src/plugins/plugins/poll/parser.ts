const props = (text: string) => {
  const lines = text.split('\n-').reduce<string[]>((acc, t) => {
    const sanitized = t.trim();
    if (!sanitized) {
      return acc;
    }

    acc.push(sanitized);

    return acc;
  }, []);

  const [title, ...options] = lines;

  if (!(title && options.length)) {
    throw new Error('Error: add a title and at least one option and answer');
  }

  return {
    title,
    options,
  };
};

export default props;
