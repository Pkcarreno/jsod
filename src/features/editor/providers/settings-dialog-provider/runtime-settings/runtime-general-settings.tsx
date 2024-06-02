import prettyMilliseconds from 'pretty-ms';
import { useRef } from 'react';

import { Label } from '@/components/ui/label';
import { PlusMinusInput } from '@/features/editor/components/ui/plus-minus-input';
import type { SettingsState } from '@/features/editor/stores/settings';
import { useSettingsStore } from '@/features/editor/stores/settings';

export const RuntimeGeneralSettings = () => {
  const { auto_run_timeout, updateAutoRunTimeout } = useSettingsStore();
  const autoRunTimeoutRef =
    useRef<SettingsState['auto_run_timeout']>(auto_run_timeout);

  autoRunTimeoutRef.current = auto_run_timeout;

  const AUTO_RUN_TIMEOUT_INTERVAL = 100;

  const handleAutoRunTimeoutModifier = (delta: number) => {
    updateAutoRunTimeout(autoRunTimeoutRef.current + delta);
  };

  return (
    <div className="grid gap-2">
      <small className="text-muted-foreground text-sm">General</small>
      <div className="grid items-center gap-2 sm:grid-cols-2">
        <Label>Auto run timeout</Label>
        <PlusMinusInput
          value={auto_run_timeout}
          onChange={handleAutoRunTimeoutModifier}
          interval={AUTO_RUN_TIMEOUT_INTERVAL}
          renderValue={(value) => prettyMilliseconds(value)}
        />
      </div>
    </div>
  );
};
