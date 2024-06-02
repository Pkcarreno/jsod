import { useContext } from 'react';

import { UntrustedModeContext } from '../providers/untrusted-mode-provider';

export const useUntrustedMode = () => {
  const context = useContext(UntrustedModeContext);

  if (context === undefined)
    throw new Error(
      'useUntrustedMode must be used within a UntrustedModeProvider',
    );

  return context;
};
