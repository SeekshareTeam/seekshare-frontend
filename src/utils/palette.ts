import { isObject } from 'lodash';
import colors from 'tailwindcss/colors';
import { DefaultColors } from 'tailwindcss/types/generated/colors';

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
  if (
    isObject(colors[c as keyof DefaultColors]) &&
    typeof colors[c as keyof DefaultColors] !== 'function' &&
    // @ts-ignore
    500 in colors[c as keyof DefaultColors] &&
    !nonSafeList.includes(c)
  ) {
    colorPalette.push(c);
  }
});

export default colorPalette;
