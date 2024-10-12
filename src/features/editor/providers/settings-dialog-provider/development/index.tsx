import { DebugModeSettings } from './debug-mode-settings';

export const DevelopmentSettings = () => {
  return (
    <div className="grid gap-4">
      <h3 className="font-medium leading-none">Development</h3>
      <small className="text-muted text-sm">
        <b>Note:</b> These settings are intended for debugging purpose
      </small>
      <DebugModeSettings />
    </div>
  );
};
