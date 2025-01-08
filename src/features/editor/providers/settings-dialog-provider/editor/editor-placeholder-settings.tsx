import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useSettingsStore } from '@/features/editor/stores/settings';

export const EditorPlaceholderSettings = () => {
  const { editorPlaceholder, updateEditorPlaceholder } = useSettingsStore();

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-2">
        <Label>Placeholder</Label>
        <Switch
          onCheckedChange={updateEditorPlaceholder}
          checked={editorPlaceholder}
        />
      </div>
    </div>
  );
};
