import { Spinner } from './ui/spinner';

export const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner />
    </div>
  );
};
