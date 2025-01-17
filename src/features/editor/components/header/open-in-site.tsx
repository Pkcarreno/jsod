import { ExternalLink } from 'lucide-react';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';

export const OpenInSite = () => {
  const prepareUrl = useMemo(() => {
    const url = new URL(location.href);

    const searchParams = new URLSearchParams(location.hash.slice(1));
    url.hash = searchParams.toString();

    return url.href;
  }, [location]);

  return (
    <Button asChild variant="outline">
      <a href={prepareUrl} className="flex items-center gap-1" target="_blank">
        Open
        <ExternalLink className="size-4" />
      </a>
    </Button>
  );
};
