import { Button } from '@/components/ui/button';
import { useLogsStore } from '@/features/editor/stores/editor';
import { cn } from '@/lib/utils';

import type { panesType } from '../..';

interface Props {
  currentPane: panesType;
  setCurrentPane: (pane: panesType) => void;
}
export const Footer: React.FC<Props> = ({ currentPane, setCurrentPane }) => {
  const { alert, clearAlert } = useLogsStore();

  const handleTogglePane = (newPane: panesType) => {
    if (currentPane !== newPane) {
      setCurrentPane(newPane);
      if (newPane === 'output') {
        clearAlert();
      }
    }
  };

  return (
    <footer className="flex w-full gap-1 p-1">
      <Button
        className={cn('flex-1', currentPane === 'editor' && 'bg-primary/70')}
        size="sm"
        variant={currentPane === 'editor' ? 'default' : 'ghost'}
        onClick={() => handleTogglePane('editor')}
      >
        Editor
      </Button>
      <Button
        className={cn(
          'relative flex-1',
          currentPane === 'output' && 'bg-primary/70',
        )}
        size="sm"
        variant={currentPane === 'output' ? 'default' : 'ghost'}
        onClick={() => handleTogglePane('output')}
      >
        <span className="relative">
          Output
          {alert && (
            <div className="bg-destructive absolute -right-2.5 top-0.5 size-2 rounded-full transition-colors" />
          )}
        </span>
      </Button>
    </footer>
  );
};
