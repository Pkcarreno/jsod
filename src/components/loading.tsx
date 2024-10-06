import { Spinner } from './ui/spinner';

export const Loading = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <Spinner />
    </div>
  );
};
