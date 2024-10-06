import { LogsList } from './logs-list';
import { OutputHeader } from './output-header';

export const Output = () => {
  return (
    <>
      <div className="flex h-full flex-col gap-2 px-3 py-2">
        <OutputHeader />
        <div className="flex-1">
          <LogsList />
        </div>
      </div>
    </>
  );
};

export default Output;
