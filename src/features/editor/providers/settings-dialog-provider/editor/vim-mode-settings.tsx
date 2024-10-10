import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useSettingsStore } from '@/features/editor/stores/settings';

export const VimModeSettings = () => {
  const { vimMode, updateVimMode } = useSettingsStore();

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-2">
        <Label>Vim Motions</Label>
        <Switch onCheckedChange={updateVimMode} checked={vimMode} />
      </div>
    </div>
  );
};
