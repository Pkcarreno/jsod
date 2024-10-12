import { VimModeSettings } from './vim-mode-settings';

export const EditorSettings = () => {
  return (
    <div className="grid gap-4">
      <h3 className="font-medium leading-none">Editor</h3>
      <VimModeSettings />
    </div>
  );
};
