import { NextPage } from 'next';

export type PageWithLayout<T> = NextPage<T> & { layoutType: string };

export type SpaceRequiredProps = {
  subspaceId?: string;
  workspaceId?: string;
}

export type DualIconItem<T> = {
  item: T;

  leftIcon?: React.ReactNode;

  rightIcon?: React.ReactNode;

  onSelect?: (item?: T) => void;
}

export type SidebarTab = {
  tabValue: string;
  tabKey: string;
  children?: SidebarTab[];
  icon?: React.ReactNode;
}

