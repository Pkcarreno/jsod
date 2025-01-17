import { Check, ChevronDown, ExternalLink, RefreshCw } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePrompt } from '@/hooks/use-prompt';
import { useTheme } from '@/hooks/use-theme';

import { useHelp } from '../../hooks/use-help';
import { useSettingsDialog } from '../../hooks/use-settings-dialog';

// eslint-disable-next-line max-lines-per-function
export const MainMenu = () => {
  const { theme, setTheme } = useTheme();
  const { setSettingsOpen } = useSettingsDialog();
  const help = useHelp();
  const { needRefresh, updateServiceWorker } = usePrompt();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1">
        <span className="text-xl font-bold">JSoD</span>
        <ChevronDown className="text-muted-foreground size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                disabled={theme === 'light'}
                onClick={() => setTheme('light')}
                className="justify-between"
              >
                Light
                {theme === 'light' && <Check className="size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={theme === 'dark'}
                onClick={() => setTheme('dark')}
                className="justify-between"
              >
                Dark
                {theme === 'dark' && <Check className="size-4" />}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={theme === 'system'}
                onClick={() => setTheme('system')}
                className="justify-between"
              >
                System
                {theme === 'system' && <Check className="size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={help.openHelpDialog}>
          Need Help?
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href="https://github.com/pkcarreno/jsod"
            className="flex gap-1"
            target="_blank"
          >
            Github <ExternalLink className="size-4" />
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {needRefresh && (
          <>
            <DropdownMenuItem
              className="bg-primary/20 focus:bg-primary/40 focus:text-foreground gap-1"
              onClick={() => updateServiceWorker(true)}
            >
              <RefreshCw className="size-4" />
              New Update
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem disabled>v{APP_VERSION}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
