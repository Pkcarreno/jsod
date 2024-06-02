import 'unfonts.css';
import '@/assets/globals.css';

import App from 'app';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(<App />);
