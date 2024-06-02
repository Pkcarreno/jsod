import { SymbolIcon } from '@radix-ui/react-icons';

import { Toggle } from '@/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSettingsStore } from '@/features/editor/stores/settings';

export const AutorunToggler = () => {
  const { auto_run, updateAutoRun } = useSettingsStore();

  return (
    <TooltipProvider>
      <Tooltip>
        <Toggle
          variant="outline"
          pressed={auto_run}
          onClick={() => updateAutoRun(!auto_run)}
          size="icon"
          asChild
        >
          <TooltipTrigger>
            <SymbolIcon />
          </TooltipTrigger>
        </Toggle>
        <TooltipContent>
          <p>Auto run</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
