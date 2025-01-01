import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useUntrustedMode } from '@/features/editor/hooks/use-untrusted-mode';
import { useCodeStore } from '@/features/editor/stores/editor';

const FormSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

interface Props {
  closeDialog: () => void;
}

export const InfoForm: React.FC<Props> = ({ closeDialog }) => {
  const { title, description, setMetadata } = useCodeStore();
  const { isUntrustedMode } = useUntrustedMode();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title,
      description,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setMetadata(data);

    toast('Script details changed properly!');

    closeDialog();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input disabled={isUntrustedMode} {...field} />
              </FormControl>
              <FormDescription>Public display title</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea disabled={isUntrustedMode} {...field} />
              </FormControl>
              <FormDescription>Explain what your script does</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isUntrustedMode}>
          Save
        </Button>
      </form>
    </Form>
  );
};

interface InfoFormDialogProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const InfoFormDialog: React.FC<InfoFormDialogProps> = ({
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
          <DialogTitle>Edit script details</DialogTitle>
        </DialogHeader>
        <InfoForm closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
};
