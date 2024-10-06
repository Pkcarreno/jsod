import { lazy, Suspense } from 'react';

import { Loading } from '@/components/loading';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

import { Footer, Header } from './components';
import { useLayoutHandler } from './hooks/use-layout-handler';
import EditorProviders from './providers';
import { useSettingsStore } from './stores/settings';

const Output = lazy(() => import('./components/output'));
const CodemirrorEditor = lazy(() => import('./components/editor'));

const Editor = () => {
  const { layout_direction } = useSettingsStore();
  const {
    isVisiblePanelLeft,
    setIsVisiblePanelLeft,
    isVisiblePanelRight,
    setIsVisiblePanelRight,
    panelLeftRef,
    panelRightRef,
    handleOpenRight,
    handleOpenLeft,
  } = useLayoutHandler();

  return (
    <EditorProviders>
      <main className="flex h-dvh flex-col font-sans">
        <Header />
        <section className="h-full overflow-auto">
          <ResizablePanelGroup
            autoSaveId="persistence"
            direction={layout_direction}
          >
            <ResizablePanel
              ref={panelLeftRef}
              collapsible={true}
              collapsedSize={0}
              minSize={14}
              onCollapse={() => setIsVisiblePanelLeft(false)}
              onExpand={() => setIsVisiblePanelLeft(true)}
            >
              <Suspense fallback={<Loading />}>
                <CodemirrorEditor />
              </Suspense>
            </ResizablePanel>
            <ResizableHandle withHandle className="hidden md:flex" />
            <ResizablePanel
              ref={panelRightRef}
              collapsible={true}
              collapsedSize={0}
              minSize={14}
              onCollapse={() => setIsVisiblePanelRight(false)}
              onExpand={() => setIsVisiblePanelRight(true)}
            >
              <Suspense fallback={<Loading />}>
                <Output />
              </Suspense>
            </ResizablePanel>
          </ResizablePanelGroup>
        </section>
        <Footer
          onLeftClick={handleOpenLeft}
          isLeftActive={isVisiblePanelLeft}
          onRightClick={handleOpenRight}
          isRightActive={isVisiblePanelRight}
        />
      </main>
    </EditorProviders>
  );
};

export default Editor;
