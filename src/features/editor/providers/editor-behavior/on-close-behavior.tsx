import React, { useEffect } from 'react';

import { useUntrustedMode } from '@/features/editor/hooks/use-untrusted-mode';
import { useCodeStore } from '@/features/editor/stores/editor';
import useBeforeUnload from '@/hooks/use-before-unload';

import { stopJs } from '../../utils/engine/controller';

interface Props {
  children: React.ReactNode;
}

export const OnCloseBehavior: React.FC<Props> = ({ children }) => {
  const { code } = useCodeStore();
  const { isUntrustedMode } = useUntrustedMode();
  useBeforeUnload(
    code.length > 0 && !isUntrustedMode,
    'Be sure to save your script before exiting, otherwise you will lose it, do you want to continue?',
  );

  // terminate worker if exist
  useEffect(() => {
    return () => {
      stopJs();
    };
  }, []);
  return <>{children}</>;
};
