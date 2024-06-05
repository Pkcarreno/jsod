import { useContext } from 'react';

import { PromptContext } from '@/providers/prompt-provider';

export const usePrompt = () => {
  const context = useContext(PromptContext);

  if (context === undefined)
    throw new Error('usePrompt must be used within a PromptProvider');

  return context;
};
