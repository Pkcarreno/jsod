import { zodResolver } from '@hookform/resolvers/zod';
import { PencilLine } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

import { InlineInput } from '@/components/inline-input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { cn } from '@/lib/utils';

import { useUntrustedMode } from '../../hooks/use-untrusted-mode';
import { useCodeStore } from '../../stores/editor';

type TitleProviderState = {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

const TitleContext = createContext<TitleProviderState>({
  isEdit: false,
  setIsEdit: () => null,
});

interface TitleProviderProps {
  children: React.ReactNode;
}

export const TitleProvider: React.FC<TitleProviderProps> = ({ children }) => {
  const [isEdit, setIsEdit] = useState(false);

  return <TitleContext value={{ isEdit, setIsEdit }}>{children}</TitleContext>;
};

export const useTitle = () => {
  const context = useContext(TitleContext);

  if (context === undefined)
    throw new Error('useTitle must be used within a TitleProvider');

  return context;
};

const FormSchema = z.object({
  title: z.string().optional(),
});

// eslint-disable-next-line max-lines-per-function
export const Title = () => {
  const { title, setMetadata } = useCodeStore();
  const { isUntrustedMode } = useUntrustedMode();
  const { isEdit, setIsEdit } = useTitle();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title,
    },
  });

  const isTitle = useMemo(() => title && title.length > 0, [title]);
  const spanPlaceholder = useMemo(
    () => (isTitle ? title : 'Untitled'),

    [isTitle, title],
  );
  const spanTextStyle = useMemo(() => {
    if (isUntrustedMode) {
      return 'text-muted-foreground';
    }

    if (isTitle) {
      return 'text-foreground';
    }

    return 'text-muted';
  }, [isUntrustedMode, isTitle]);
  const spanIconStyle = useMemo(() => {
    if (isUntrustedMode) {
      return 'text-muted-foreground';
    }
    return 'text-foreground hover:text-muted-foreground';
  }, [isUntrustedMode, isTitle]);

  const handleSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (value) => {
    if (value.title) {
      const cleanTitle = sanitizeHtml(value.title ?? '', {
        allowedTags: [],
        allowedAttributes: {},
      });

      setMetadata({ title: cleanTitle });
    } else {
      setMetadata({ title: value.title });
    }

    setIsEdit(false);
  };

  const handleToggleEditMode = () => {
    if (!isUntrustedMode) setIsEdit(true);
  };

  return (
    <div
      onBlur={form.handleSubmit(handleSubmit)}
      className="w-full overflow-hidden font-mono"
    >
      {isEdit ? (
        <Form {...form}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <InlineInput
                    disabled={isUntrustedMode}
                    placeholder="Untitled"
                    autoFocus
                    className="bg-background disabled:text-muted-foreground placeholder:text-muted block w-full truncate text-sm focus-visible:outline-none md:text-base lg:text-lg"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      ) : (
        <div className="flex gap-1.5 overflow-hidden">
          <span
            title={spanPlaceholder}
            className={cn(
              'bg-background block truncate whitespace-pre text-nowrap text-sm focus-visible:outline-none md:text-base lg:text-lg',
              spanTextStyle,
            )}
          >
            {spanPlaceholder}
          </span>
          <div
            className={cn('my-auto w-fit cursor-pointer', spanIconStyle)}
            onClick={handleToggleEditMode}
          >
            <PencilLine className="size-4" />
          </div>
        </div>
      )}
    </div>
  );
};
