import { useContext } from 'react';

import { ExecutionLayerContext } from '../providers/execution-layer';

export const useExecutionLayer = () => {
  const context = useContext(ExecutionLayerContext);

  if (context === undefined)
    throw new Error(
      'useExecutionLayer must be used within a ExecutionLayerProvider',
    );

  return context;
};
