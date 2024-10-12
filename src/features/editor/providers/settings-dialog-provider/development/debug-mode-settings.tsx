import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useSettingsStore } from '@/features/editor/stores/settings';

export const DebugModeSettings = () => {
  const { debugMode, updateDebugMode } = useSettingsStore();

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-2">
        <Label>Logs</Label>
        <Switch onCheckedChange={updateDebugMode} checked={debugMode} />
      </div>
    </div>
  );
};
