import type { Set } from './types';

// Durstenfeld shuffle
export const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

export const flagsToSet = (flags: string) => {
  return flags.split(' ').reduce<Set>((acc, flag) => {
    acc[flag] = 1;
    return acc;
  }, {});
};
