import { ViewHorizontalIcon, ViewVerticalIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSettingsStore } from '@/features/editor/stores/settings';

export const LayoutDirectionToggler = () => {
  const { layout_direction, updateLayoutDirection } = useSettingsStore();

  const nextDirection =
    layout_direction === 'vertical' ? 'horizontal' : 'vertical';

  const isHorizontal = layout_direction === 'horizontal';

  return (
    <TooltipProvider>
      <Tooltip>
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateLayoutDirection(nextDirection)}
          asChild
        >
          <TooltipTrigger>
            {isHorizontal ? <ViewHorizontalIcon /> : <ViewVerticalIcon />}
          </TooltipTrigger>
        </Button>
        <TooltipContent>
          <p>Switch to {layout_direction} layout</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
