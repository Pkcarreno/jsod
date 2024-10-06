import { Share1Icon } from '@radix-ui/react-icons';
import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// eslint-disable-next-line max-lines-per-function
export const SharingMenu = () => {
  const [isWithCode, setIsWithCode] = useState(true);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [sharedUrl, setSharedUrl] = useState('');

  const copyShareToClipboard = async () => {
    try {
      copy(sharedUrl);
      toast('Copied to clipboard!', {
        description: !isWithCode
          ? 'Thanks for sharing JSoD!'
          : 'Url contains your code!',
      });
    } catch (e) {
      console.error(e);
      toast('Cannot be copied to clipboard!', {
        description: 'Try again or copy manually.',
      });
    }
  };

  const copyEmbededToClipboard = async () => {
    try {
      const url = new URL(location.href);
      const searchParams = new URLSearchParams(location.hash.slice(1));
      url.hash = searchParams.toString();

      const embededUrl = `<iframe src="${url.href}" height="800" width="800" />`;
      copy(embededUrl);
      toast('Copied to clipboard!', {
        description: 'Thanks for using JSoD!',
      });
    } catch (e) {
      console.error(e);
      toast('Cannot be copied to clipboard!', {
        description: 'Try again or copy manually.',
      });
    }
  };

  const handleTooltipTriggerClick = () => {
    prepareSharedUrl();
  };

  const prepareSharedUrl = () => {
    const url = new URL(location.href);

    const searchParams = new URLSearchParams(location.hash.slice(1));
    if (!isWithCode) {
      searchParams.delete('code');
    }
    url.hash = searchParams.toString();

    setSharedUrl(url.href);
  };

  useEffect(() => {
    prepareSharedUrl();
  }, [isTooltipOpen, isWithCode]);

  return (
    <TooltipProvider>
      <Popover>
        <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                onClick={handleTooltipTriggerClick}
              >
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
          <Tabs defaultValue="share">
            <TabsList className="w-full">
              <TabsTrigger value="share" className="flex-1">
                Share
              </TabsTrigger>
              <TabsTrigger value="embed" className="flex-1">
                Embed
              </TabsTrigger>
            </TabsList>
            <TabsContent value="share" className="grid gap-2">
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">
                  share JSoD with/without your current code.
                </p>
              </div>

              <div className="flex space-x-2">
                <Input value={sharedUrl} readOnly />
                <Button onClick={copyShareToClipboard} variant="secondary">
                  Copy link
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={isWithCode}
                  onCheckedChange={() => setIsWithCode(!isWithCode)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  with code
                </label>
              </div>
            </TabsContent>
            <TabsContent value="embed" className="grid gap-2">
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">
                  To embed the current code on your website, use the same share
                  link or click the copy button to get the iframe snippet ready
                  to use.
                </p>
              </div>

              <div className="flex space-x-2">
                <Button onClick={copyEmbededToClipboard} variant="secondary">
                  Copy iframe
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};
