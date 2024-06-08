import type { IconProps } from '@radix-ui/react-icons/dist/types';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import React from 'react';

import type { ButtonProps } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BottomTabsContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const BottomTabsContainer: React.FC<BottomTabsContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'border-border flex justify-between gap-2 border-t px-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface BottomTabsTabProps extends ButtonProps {
  label: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  isActive?: boolean;
  showBadge?: boolean;
}

export const BottomTabsTab: React.FC<BottomTabsTabProps> = ({
  label,
  icon,
  isActive = false,
  showBadge,
  ...props
}) => {
  const Icon = icon;
  return (
    <Button
      variant="ghost"
      className="h-fit w-full flex-col gap-1 px-0 pb-4 pt-3"
      {...props}
    >
      <div
        className={cn(
          'relative flex size-fit items-center justify-center rounded-2xl px-5 py-1 transition-colors',
          isActive && 'bg-primary text-primary-foreground',
        )}
      >
        <div
          className={cn(
            'absolute right-0 top-0 size-3 rounded-full transition-colors',
            showBadge ? 'bg-destructive' : 'transparent',
          )}
        />
        <div className="flex size-6 items-center justify-center">
          <Icon className="size-4" />
        </div>
      </div>
      <span
        className={cn('text-muted-foreground text-xs', isActive && 'font-bold')}
      >
        {label}
      </span>
    </Button>
  );
};
