import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCodeStore } from '@/features/editor/stores/editor';

import { InfoForm } from './info-form';

interface InfoDialogProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const InfoDialog: React.FC<InfoDialogProps> = ({
  children,
  asChild,
}) => {
  const [open, setOpen] = useState(false);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Script details</DialogTitle>
        </DialogHeader>
        <InfoForm closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
};

export const InfoTitle = () => {
  const { title } = useCodeStore();

  const titleTag = useMemo(() => (title ? title : 'No Title'), [title]);

  return (
    <InfoDialog asChild>
      <span className="text-muted-foreground my-auto block truncate text-left text-sm">
        {titleTag}
      </span>
    </InfoDialog>
  );
};

export const InfoEdit = () => {
  return (
    <InfoDialog asChild>
      <Button size="icon" variant="ghost">
        <InfoCircledIcon />
        <span className="sr-only">Shared current code</span>
      </Button>
    </InfoDialog>
  );
};
