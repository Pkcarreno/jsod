import { lazy, Suspense, useMemo } from 'react';

import { Loading } from '@/components/loading';

const BaseEditor = lazy(() => import('./features/base'));
const EmbededEditor = lazy(() => import('./features/embeded'));

const Editor = () => {
  const isIframe = useMemo(() => window.self !== window.top, []);

  if (isIframe) {
    return (
      <Suspense
        fallback={
          <div className="h-screen w-screen">
            <Loading />
          </div>
        }
      >
        <EmbededEditor />
      </Suspense>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen">
          <Loading />
        </div>
      }
    >
      <BaseEditor />
    </Suspense>
  );
};

export default Editor;
