const props = (text: string) => {
  const [title, answer] = text.split(/\n-(.*)/s);

  if (!title) {
    throw new Error('Error: add a title');
  }

  return {
    title,
    answer,
  };
};

export default props;
