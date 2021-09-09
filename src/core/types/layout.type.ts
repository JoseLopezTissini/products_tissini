import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type PageWithLayout = {
  getLayout?: (page: ReactElement) => ReactNode;
} & NextPage;
