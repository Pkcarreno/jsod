import { useCallback, useEffect } from 'react';

import { offEventListener, onEventListener } from '@/lib/utils';

const useBeforeUnload = (
  enabled: boolean | (() => boolean) = true,
  message?: string,
) => {
  const handler = useCallback(
    (event: BeforeUnloadEvent) => {
      const finalEnabled = typeof enabled === 'function' ? enabled() : true;

      if (!finalEnabled) {
        return;
      }

      event.preventDefault();

      if (message) {
        event.returnValue = message;
      }

      return message;
    },
    [enabled, message],
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    onEventListener(window, 'beforeunload', handler);

    return () => offEventListener(window, 'beforeunload', handler);
  }, [enabled, handler]);
};

export default useBeforeUnload;
