import { NextPage } from 'next';

export type PageWithLayout<T> = NextPage<T> & { layoutType: string };
