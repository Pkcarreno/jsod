import { Share1Icon } from '@radix-ui/react-icons';
import copy from 'copy-to-clipboard';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const getCurrentUrl = () => {
  const url = new URL(location.href);
  const searchParams = new URLSearchParams(location.hash.slice(1));
  url.hash = searchParams.toString();

  return url;
};

const copyToClipboard = (
  value: string,
  message: string | undefined = 'Copied to clipboard!',
) => {
  try {
    copy(value);
    toast(message, {});
  } catch (e) {
    console.error(e);
    toast('Cannot be copied to clipboard!', {
      description: 'Try again or copy manually.',
    });
  }
};

export const SharingMenu = () => {
  const copyLinkToClipboard = async () => {
    const url = getCurrentUrl();

    copyToClipboard(url.href, 'Link copied to clipboard!');
  };

  const copyIframeToClipboard = async () => {
    const url = getCurrentUrl();

    const embededUrl = `<iframe src="${url.href}" height="800" width="800" />`;
    copyToClipboard(embededUrl, 'iframe copied to clipboard!');
  };

  return (
    <TooltipProvider>
      <Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button size="icon" variant="outline">
                <Share1Icon />
                <span className="sr-only">Shared current code</span>
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sharing code</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent>
          <div className="space-y-2">
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                Share JSoD with your current code.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <Button
                onClick={copyLinkToClipboard}
                variant="secondary"
                className="w-full"
              >
                Copy link
              </Button>
              <Button
                onClick={copyIframeToClipboard}
                variant="secondary"
                className="w-full"
              >
                Copy iframe
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};
