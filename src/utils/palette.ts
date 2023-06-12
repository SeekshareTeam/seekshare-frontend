import { isObject } from 'lodash';
import colors from 'tailwindcss/colors';

import type { DefaultColors } from 'tailwindcss/types/generated/colors';

const colorPalette: string[] = [];
const nonSafeList = [
  'lightBlue',
  'warmGray',
  'trueGray',
  'coolGray',
  'blueGray',
  'zinc',
  'stone',
  'neutral',
  'slate',
];

Object.keys(colors).forEach((c) => {
  const color = colors[c as keyof DefaultColors];

  if (
    isObject(color) &&
    typeof color !== 'function' &&
    500 in color &&
    !nonSafeList.includes(c)
  ) {
    colorPalette.push(c);
  }
});

export default colorPalette;
