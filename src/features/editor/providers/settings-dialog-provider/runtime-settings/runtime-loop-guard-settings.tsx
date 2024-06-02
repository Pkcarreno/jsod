import prettyMilliseconds from 'pretty-ms';
import { useRef } from 'react';

import { Label } from '@/components/ui/label';
import { PlusMinusInput } from '@/features/editor/components/ui/plus-minus-input';
import type { SettingsState } from '@/features/editor/stores/settings';
import { useSettingsStore } from '@/features/editor/stores/settings';

export const RuntimeLoopGuardSettings = () => {
  const {
    loop_safeguard_timeout,
    loop_safeguard_threshold,
    updateLoopSafeguardTimeout,
    updateLoopSafeguardThreshold,
  } = useSettingsStore();
  const loopSafeguardThresholdRef = useRef<
    SettingsState['loop_safeguard_threshold']
  >(loop_safeguard_threshold);
  const loopSafeguardTimeoutRef = useRef<
    SettingsState['loop_safeguard_timeout']
  >(loop_safeguard_timeout);

  loopSafeguardThresholdRef.current = loop_safeguard_threshold;
  loopSafeguardTimeoutRef.current = loop_safeguard_timeout;

  const LOOP_THRESHOLD_INTERVAL = 10;
  const LOOP_TIMEOUT_INTERVAL = 5;

  const handleLoopThresholdModifier = (delta: number) => {
    updateLoopSafeguardThreshold(loopSafeguardThresholdRef.current + delta);
  };

  const handleLoopTimeoutModifier = (delta: number) => {
    updateLoopSafeguardTimeout(loopSafeguardTimeoutRef.current + delta);
  };
  return (
    <div className="grid gap-2">
      <small className="text-muted-foreground text-sm">Loop guard</small>
      <div className="grid items-center gap-2 sm:grid-cols-2">
        <Label>Threshold</Label>

        <PlusMinusInput
          value={loop_safeguard_threshold}
          onChange={handleLoopThresholdModifier}
          interval={LOOP_THRESHOLD_INTERVAL}
        />
      </div>
      <div className="grid items-center gap-2 sm:grid-cols-2">
        <Label>Timeout</Label>
        <PlusMinusInput
          value={loop_safeguard_timeout}
          onChange={handleLoopTimeoutModifier}
          interval={LOOP_TIMEOUT_INTERVAL}
          renderValue={(value) => prettyMilliseconds(value)}
        />
      </div>
    </div>
  );
};
