import { NextPage } from 'next';

import { keyBy } from 'lodash';

export type AccessLevel = {
  page: 'admin' | 'user';
  [key: string]: string | undefined;
};

export type PageWithLayout<T> = NextPage<T> & {
  layoutType?: string;
  accessLevel?: AccessLevel;
};

export type SpaceRequiredProps = {
  subspaceId?: string;
  workspaceId?: string;
};

export type DualIconItem<T> = {
  item: T;

  leftIcon?: React.ReactNode;

  rightIcon?: React.ReactNode;

  onSelect?: (item?: T) => void;
};

export type SidebarTab = {
  tabValue: string;
  tabKey: string;
  children?: SidebarTab[];
  icon?: React.ReactNode;
};

export type PostType = 'question' | 'notes' | 'qna' | 'quiz';
export type QnaType = 'question' | 'answer';

export const PostTypeOptions: { id: PostType; text: string }[] = [
  { id: 'question', text: 'Question' },
  { id: 'notes', text: 'Note' },
  { id: 'qna', text: 'QnA' },
  { id: 'quiz', text: 'Quiz' },
];

export const PostTypeOptionKey: {
  [key: string]: { id: PostType; text: string };
} = keyBy(PostTypeOptions, 'id');

/* Table */
export type GridItem<T extends string> = {
  /*
   * React Node
   */
  [key in T]: React.ReactNode;
};

export const gridWidth = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
};

export const gridColumns = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
};

export type ConfigType<K> = { width: keyof typeof gridWidth; key: K };

export interface GridLayout<T extends GridItem<string>, K extends keyof T> {
  columns: keyof typeof gridColumns;
  config: ConfigType<K>[];
  headers?: T;
  gridData: T[];
  keyName: string;
  className?: string;
}

export interface GridRow<T extends GridItem<string>, K extends keyof T> {
  row: T;
  config: ConfigType<K>[];
}
