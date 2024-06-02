import { Badge } from '@/components/ui/badge';
import { useUntrustedMode } from '@/features/editor/hooks/use-untrusted-mode';

export const UntrustedModeSign = () => {
  const { isUntrustedMode, setUntrustedDialogOpen } = useUntrustedMode();

  if (!isUntrustedMode) return null;

  return (
    <div className="flex h-full items-center ">
      <Badge
        variant="warning"
        className="hover:cursor-pointer"
        onClick={() => setUntrustedDialogOpen(true)}
      >
        Editor in Untrusted Mode
      </Badge>
    </div>
  );
};

export const BottomHeaderUntrustedModeSign = () => {
  const { isUntrustedMode } = useUntrustedMode();
  if (!isUntrustedMode) return null;

  return (
    <div className="flex h-fit w-full justify-center p-3 sm:hidden">
      <UntrustedModeSign />
    </div>
  );
};
