import { lazy } from 'react';

import type { routerType } from '@/types/router';

const Editor = lazy(() => import('@/features/editor'));

const routes: routerType[] = [
  {
    path: '/',
    element: Editor,
    title: 'Editor',
  },
];

export default routes;
