import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/providers/theme-provider';
import Router from '@/routes';

const App = () => (
  <ThemeProvider storageKey="theme">
    <Router />
    <Toaster />
  </ThemeProvider>
);

export default App;
