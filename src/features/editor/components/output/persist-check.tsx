import { Checkbox } from '@/components/ui/checkbox';

import { useSettingsStore } from '../../stores/settings';

export const PersistCheck = () => {
  const { persist_logs, updatePersistLogs } = useSettingsStore();
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="persist_logs"
        onClick={() => {
          updatePersistLogs(!persist_logs);
        }}
        checked={persist_logs}
      />
      <label
        htmlFor="persist_logs"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        persist logs
      </label>
    </div>
  );
};
