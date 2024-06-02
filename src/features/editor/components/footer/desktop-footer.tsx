import { PinLeftIcon, PinRightIcon } from '@radix-ui/react-icons';
import { Separator } from '@radix-ui/react-separator';
import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useHelp } from '../../hooks/use-help';
import { LayoutDirectionToggler } from './layout-direction-toggler';
import type { FooterProps } from './types';

interface Props
  extends FooterProps,
    Pick<React.HTMLAttributes<HTMLDivElement>, 'className'> {}

export const DesktopFooter: React.FC<Props> = ({
  onLeftClick,
  isLeftActive,
  onRightClick,
  isRightActive,
  className,
}) => {
  const help = useHelp();

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <Separator className="bg-border h-px" />

      <div className="flex justify-between gap-2 px-2 py-1">
        <div className="flex flex-1 gap-2">
          {!isLeftActive && (
            <Button
              className="mr-1"
              variant="outline"
              size="sm"
              onClick={onLeftClick}
            >
              <PinLeftIcon />
            </Button>
          )}
        </div>

        <div className="flex flex-1 justify-center gap-2">
          <Button
            variant="link"
            size="sm"
            className="text-muted-foreground"
            onClick={help.openHelpDialog}
          >
            Need help?
          </Button>
        </div>

        <div className="flex flex-1 justify-end gap-2" onClick={onRightClick}>
          <LayoutDirectionToggler />
          {!isRightActive && (
            <Button className="ml-1" variant="outline" size="sm">
              <PinRightIcon />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
