import { lazy, Suspense } from 'react';
import { Route, Router as WRouter, Switch } from 'wouter';

import { Loading } from '@/components/loading';
import type { routerType } from '@/types/router';

import routes from './routes';

const NotFound = lazy(() => import('@/features/not-found'));

const Router = () => {
  const pageRoutes = routes.map(({ path, title, element }: routerType) => {
    return <Route key={title} path={path} component={element} />;
  });

  return (
    <Suspense fallback={<Loading />}>
      <WRouter base={BASE_URL}>
        <Switch>
          {pageRoutes}
          {/* default page */}
          <Route component={NotFound} />
        </Switch>
      </WRouter>
    </Suspense>
  );
};

export default Router;
