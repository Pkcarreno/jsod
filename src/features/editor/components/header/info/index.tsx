import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCodeStore } from '@/features/editor/stores/editor';

import { InfoFormDialog } from './info-form';

interface InfoDialogProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const InfoDialog: React.FC<InfoDialogProps> = ({
  children,
  asChild,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Script details</DialogTitle>
        </DialogHeader>
        <InfoDetails />
      </DialogContent>
    </Dialog>
  );
};

const InfoDetails = () => {
  const { title, description } = useCodeStore();

  const titleTag = useMemo(() => (title ? title : 'No Title'), [title]);
  const descriptionTag = useMemo(
    () => (description ? description : 'No Description'),
    [description],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label>Title</label>
        <span className="text-muted-foreground">{titleTag}</span>
      </div>
      <div className="flex flex-col gap-2">
        <label>Description</label>
        <span className="text-muted-foreground">{descriptionTag}</span>
      </div>
      <InfoFormDialog asChild>
        <Button>Edit</Button>
      </InfoFormDialog>
    </div>
  );
};

export const InfoTitle = () => {
  const { title } = useCodeStore();

  const titleTag = useMemo(() => (title ? title : 'No Title'), [title]);

  return (
    <InfoDialog asChild>
      <Button variant="ghost" className="justify-start overflow-x-hidden">
        <div className="flex flex-col text-left">
          <span className="text-muted text-xs">title</span>
          <span className="my-auto block truncate text-left text-sm">
            {titleTag}
          </span>
        </div>
      </Button>
    </InfoDialog>
  );
};
