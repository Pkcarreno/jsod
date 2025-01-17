import { ArrowDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { VirtuosoHandle } from 'react-virtuoso';
import { Virtuoso } from 'react-virtuoso';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useLogsStore } from '../../stores/editor';
import { LogItem } from './log-item';

const EmptyListView = () => (
  <div className="flex h-full flex-1 items-center justify-center gap-1">
    <small className="text-muted-foreground text-center text-sm">Empty</small>
  </div>
);

const EmptyListFirstTimeView = () => (
  <div className="flex h-full flex-1 items-center justify-center gap-1">
    <small className="text-muted-foreground text-center text-sm">
      No logs yet 🥺
    </small>
  </div>
);

// eslint-disable-next-line max-lines-per-function
export const LogsList = () => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const { logs, isFirstTime } = useLogsStore();
  const [atBottom, setAtBottom] = useState(false);
  const showButtonTimeoutRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    return () => {
      if (showButtonTimeoutRef.current) {
        clearTimeout(showButtonTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (showButtonTimeoutRef.current) {
      clearTimeout(showButtonTimeoutRef.current);
    }
    if (!atBottom) {
      showButtonTimeoutRef.current = setTimeout(() => setShowButton(true), 500);
    } else {
      setShowButton(false);
    }
  }, [atBottom, setShowButton]);

  if (!logs || !Array.isArray(logs) || logs.length < 1) {
    if (isFirstTime) {
      return <EmptyListFirstTimeView />;
    } else {
      return <EmptyListView />;
    }
  }

  return (
    <div className="relative h-full ">
      <Virtuoso
        style={{ height: '100%' }}
        ref={virtuosoRef}
        initialTopMostItemIndex={999}
        data={logs}
        atBottomStateChange={setAtBottom}
        itemContent={(index, log) => {
          return (
            <LogItem
              key={index}
              type={log.type}
              value={log.value}
              repeats={log.repeats}
              duration={log.duration}
              details={log.detail}
            />
          );
        }}
        followOutput={'auto'}
      />
      <Button
        onClick={() =>
          virtuosoRef?.current?.scrollToIndex({
            index: logs.length - 1,
            behavior: 'smooth',
          })
        }
        className={cn(
          'absolute bottom-4 right-4',
          showButton
            ? 'animate-in fade-in-0 zoom-in-95 visible'
            : 'animate-out fade-out-0 zoom-out-95 hidden',
        )}
        size="icon"
      >
        <ArrowDown className="size-4" />
      </Button>
    </div>
  );
};
