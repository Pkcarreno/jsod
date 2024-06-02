import { Button } from '@/components/ui/button';

import { useLogsStore } from '../../stores/editor';

export const ClearConsole = () => {
  const { logs, clearLogs } = useLogsStore();
  return (
    <Button
      disabled={!logs || logs.length === 0}
      variant="ghost"
      size="sm"
      onClick={() => clearLogs()}
    >
      clear console
    </Button>
  );
};
