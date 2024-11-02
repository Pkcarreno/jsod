import { HelmetProvider } from 'react-helmet-async';

import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/providers/theme-provider';
import Router from '@/routes';

import { PromptProvider } from './providers/prompt-provider';

const App = () => (
  <HelmetProvider>
    <ThemeProvider storageKey="theme">
      <PromptProvider>
        <Router />
      </PromptProvider>
      <Toaster />
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
