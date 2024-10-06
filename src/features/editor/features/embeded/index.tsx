import { lazy, Suspense, useState } from 'react';

import { Loading } from '@/components/loading';

import { Header } from '../../components';
import EditorProviders from '../../providers';
import { Footer } from './components/footer';

const Output = lazy(() => import('../../components/output'));
const CodemirrorEditor = lazy(() => import('../../components/editor'));

export type panesType = 'editor' | 'output';

interface PaneRenderProps {
  pane: panesType;
}

const PaneRender: React.FC<PaneRenderProps> = ({ pane }) => {
  if (pane === 'output') {
    return (
      <Suspense fallback={<Loading />}>
        <Output />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <CodemirrorEditor />
    </Suspense>
  );
};

const EmbededEditor = () => {
  const [currentPane, setCurrentPane] = useState<panesType>('editor');

  return (
    <EditorProviders>
      <main className="flex h-dvh flex-col font-sans">
        <Header />
        <section className="h-full overflow-auto">
          <PaneRender pane={currentPane} />
        </section>
        <Footer currentPane={currentPane} setCurrentPane={setCurrentPane} />
      </main>
    </EditorProviders>
  );
};

export default EmbededEditor;
