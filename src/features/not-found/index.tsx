import { Link } from 'wouter';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 px-2 py-3">
      <h2 className="text-2xl font-semibold">
        Are you searching for a JS editor?
      </h2>
      <Button size="lg" asChild>
        <Link to="/">Then, click here!</Link>
      </Button>
    </div>
  );
}
