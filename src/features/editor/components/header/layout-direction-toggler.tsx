import { FlipHorizontal, FlipVertical } from 'lucide-react';

import type { ButtonProps } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSettingsStore } from '@/features/editor/stores/settings';

interface Props {
  className?: ButtonProps['className'];
}

export const LayoutDirectionToggler: React.FC<Props> = ({ className }) => {
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
          className={className}
          asChild
        >
          <TooltipTrigger>
            {isHorizontal ? (
              <FlipVertical className="size-4" />
            ) : (
              <FlipHorizontal className="size-4" />
            )}
          </TooltipTrigger>
        </Button>
        <TooltipContent>
          <p>Flip {layout_direction}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
