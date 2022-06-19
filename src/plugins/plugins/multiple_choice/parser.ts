const denoteAnswer = /\[x\] *([\s\S]*)/;

const props = (text: string) => {
  const answers: number[] = [];

  const lines = text.split('\n-').reduce<string[]>((acc, t, i) => {
    let sanitized = t.trim();
    if (!sanitized) {
      return acc;
    }

    const answer = sanitized.match(denoteAnswer);
    if (answer) {
      answers.push(i - 1);
      sanitized = answer[1];
    }

    acc.push(sanitized);

    return acc;
  }, []);

  const [title, ...options] = lines;

  if (!(title && options.length && answers.length)) {
    throw new Error('Error: add a title and at least one option and answer');
  }

  if (options.length > 26) {
    throw new Error('Error: cannot have more than 26 options');
  }

  return {
    title,
    options,
    answers,
  };
};

export default props;
