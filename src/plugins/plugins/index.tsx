/*
const plugins = [
  'multiple_choice',
  'poll',
];

const snakeToKebab = snake => snake.replaceAll('_', '-');

export default plugins.reduce((acc, dir) => {
  const name = snakeToKebab(dir);
  acc[name] = {
    parser: require(`./${dir}/parser`).default,
    component: require(`./${dir}/Component`).default,
  };

  return acc;
}, {});
*/

/*
export default {
  'multiple-choice': {
    parser: require('./multiple_choice/parser').default,
    component: require('./multiple_choice/Component').default,
  },
  poll: {
    parser: require('./poll/parser').default,
    component: require('./poll/Component').default,
  },
};
*/

export { default as MultipleChoice } from './multiple_choice/Component';
export { default as Poll } from './poll/Component';

export { default as multipleChoiceParser } from './multiple_choice/parser';
export { default as pollParser } from './poll/parser';
