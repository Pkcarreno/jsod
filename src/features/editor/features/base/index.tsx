import {
  PinBottomIcon,
  PinLeftIcon,
  PinRightIcon,
  PinTopIcon,
} from '@radix-ui/react-icons';
import { lazy, Suspense } from 'react';

import { Loading } from '@/components/loading';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

import { Header } from '../../components';
import { useLayoutHandler } from '../../hooks/use-layout-handler';
import EditorProviders from '../../providers';
import { useSettingsStore } from '../../stores/settings';
import { Footer } from './components/footer';

const Output = lazy(() => import('../../components/output'));
const CodemirrorEditor = lazy(() => import('../../components/editor'));

// eslint-disable-next-line max-lines-per-function
const BaseEditor = () => {
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
            {!isVisiblePanelLeft && (
              <Button
                className="mx-2 hidden md:flex"
                size="icon"
                onClick={handleOpenLeft}
                title="Open left panel"
              >
                {layout_direction === 'horizontal' ? (
                  <PinRightIcon />
                ) : (
                  <PinBottomIcon />
                )}
              </Button>
            )}
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
            {!isVisiblePanelRight && (
              <Button
                className="mx-2 hidden md:flex"
                size="icon"
                onClick={handleOpenRight}
                title="Open right panel"
              >
                {layout_direction === 'horizontal' ? (
                  <PinLeftIcon />
                ) : (
                  <PinTopIcon />
                )}
              </Button>
            )}
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

export default BaseEditor;
