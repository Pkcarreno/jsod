import { useContext } from 'react';

import { SettingsDialogContext } from '../providers/settings-dialog-provider';

export const useSettingsDialog = () => {
  const context = useContext(SettingsDialogContext);

  if (context === undefined)
    throw new Error(
      'useSettingsPane must be used within a SettingsDialogProvider',
    );

  return context;
};
