import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/providers/theme-provider';
import Router from '@/routes';

import { PromptProvider } from './providers/prompt-provider';

const App = () => (
  <ThemeProvider storageKey="theme">
    <PromptProvider>
      <Router />
    </PromptProvider>
    <Toaster />
  </ThemeProvider>
);

export default App;
