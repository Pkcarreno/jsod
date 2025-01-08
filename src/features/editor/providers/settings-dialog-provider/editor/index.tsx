import { EditorPlaceholderSettings } from './editor-placeholder-settings';
import { VimModeSettings } from './vim-mode-settings';

export const EditorSettings = () => {
  return (
    <div className="grid gap-4">
      <h3 className="font-medium leading-none">Editor</h3>
      <EditorPlaceholderSettings />
      <VimModeSettings />
    </div>
  );
};
