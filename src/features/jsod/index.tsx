import { Suspense, useMemo } from 'react';

import { Loading } from '@/components/loading';
import { Button } from '@/components/ui/button';

const Jsod = () => {
  const newUrl = useMemo(() => {
    const url = new URL(location.origin);
    const searchParams = new URLSearchParams(location.hash.slice(1));
    url.hash = searchParams.toString();

    return url.toString();
  }, []);

  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen">
          <Loading />
        </div>
      }
    >
      <div className="flex h-dvh w-full flex-col items-center justify-center space-y-5 p-4 text-center">
        <span className="text-2xl font-bold">Hey! &#128075;</span>
        <div>
          <p>Jsod is now running under a new domain.</p>
          <p>Click on the next link and it will take you to your code.</p>
        </div>

        <Button asChild>
          <a href={newUrl}>To my code</a>
        </Button>

        <blockquote className="text-muted">
          <strong>Note:</strong> remember to save this new link address for
          future access.
        </blockquote>
      </div>
    </Suspense>
  );
};

export default Jsod;
