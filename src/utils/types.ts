import { NextPage } from 'next';

export type AccessLevel = { page: 'admin' | 'user'; [key: string]: string | undefined };

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

