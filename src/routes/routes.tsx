import { lazy } from 'react';

import type { routerType } from '@/types/router';

const Editor = lazy(() => import('@/features/editor'));
const Jsod = lazy(() => import('@/features/jsod'));

const routes: routerType[] = [
  {
    path: '/',
    element: Editor,
    title: 'Editor',
  },
  {
    path: '/jsod/',
    element: Jsod,
    title: 'Old Editor',
  },
];

export default routes;
