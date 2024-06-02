import { useContext } from 'react';

import { HelpContext } from '../providers/help-provider';

export const useHelp = () => {
  const context = useContext(HelpContext);

  if (context === undefined)
    throw new Error('useHelp must be used within a HelpProvider');

  return context;
};
