import { NextPage } from 'next';

import { keyBy } from 'lodash';
import { Tag as TagType } from 'src/generated/types';

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

/* Post */
export type PostType = 'question' | 'notes' | 'qna' | 'quiz';
export type QnaType = 'question' | 'answer';

export const PostTypeOptions: { id: PostType; text: string }[] = [
  { id: 'question', text: 'Question' },
  { id: 'notes', text: 'Pages' },
  { id: 'qna', text: 'QnA' },
  { id: 'quiz', text: 'Quiz' },
];

export const PostTypeOptionKey: {
  [key: string]: { id: PostType; text: string };
} = keyBy(PostTypeOptions, 'id');

export type DisplayTagType = Pick<TagType, 'id' | 'value'>;

/* Table */
export type GridItem<T extends string> = {
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
  1: 'grid-cols-table-1 md:grid-cols-1',
  2: 'grid-cols-table-2 md:grid-cols-2',
  3: 'grid-cols-table-3 md:grid-cols-3',
  4: 'grid-cols-table-4 md:grid-cols-4',
  5: 'grid-cols-table-5 md:grid-cols-5',
  6: 'grid-cols-table-6 md:grid-cols-6',
  7: 'grid-cols-table-7 md:grid-cols-7',
  8: 'grid-cols-table-8 md:grid-cols-8',
  9: 'grid-cols-table-9 md:grid-cols-9',
  10: 'grid-cols-table-10 md:grid-cols-10',
  11: 'grid-cols-table-11 md:grid-cols-11',
  12: 'grid-cols-table-12 md:grid-cols-12',
};

export const flexColumns = {
  1: 'w-48 shrink-0 whitespace-nowrap overflow-hidden text-ellipsis',
  2: 'w-80 shrink-0 whitespace-nowrap overflow-hidden text-ellipsis',
  3: 'grid-cols-table-3 md:grid-cols-3',
  4: 'grid-cols-table-4 md:grid-cols-4',
  5: 'grid-cols-table-5 md:grid-cols-5',
  6: 'grid-cols-table-6 md:grid-cols-6',
  7: 'grid-cols-table-7 md:grid-cols-7',
  8: 'grid-cols-table-8 md:grid-cols-8',
  9: 'grid-cols-table-9 md:grid-cols-9',
  10: 'grid-cols-table-10 md:grid-cols-10',
  11: 'grid-cols-table-11 md:grid-cols-11',
  12: 'grid-cols-table-12 md:grid-cols-12',
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
  rowColor?: string;
  isHeader?: boolean;
}

/* Quiz Builder */

export type QuizOption = {
  key: string;
  val: string;
  answerValue: string | boolean;
};
