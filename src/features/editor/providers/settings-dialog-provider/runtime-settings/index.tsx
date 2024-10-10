import { RuntimeGeneralSettings } from './runtime-general-settings';
import { RuntimeLoopGuardSettings } from './runtime-loop-guard-settings';

export const RuntimeSettings = () => {
  return (
    <div className="grid gap-4">
      <h3 className="font-medium leading-none">JS Runtime Behavior</h3>
      <RuntimeGeneralSettings />
      <RuntimeLoopGuardSettings />
    </div>
  );
};
