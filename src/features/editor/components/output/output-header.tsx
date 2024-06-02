import { ClearConsole } from './clear-console';
import { PersistCheck } from './persist-check';

export const OutputHeader = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <PersistCheck />
      <ClearConsole />
    </div>
  );
};
