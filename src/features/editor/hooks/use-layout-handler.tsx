import { useEffect, useRef, useState } from 'react';
import type { ImperativePanelHandle } from 'react-resizable-panels';

import { useMediaQuery } from '@/hooks/use-media-query';

export const useLayoutHandler = () => {
  const isMobileView = useMediaQuery('screen and (max-width: 768px)');
  const [isVisiblePanelLeft, setIsVisiblePanelLeft] = useState(true);
  const [isVisiblePanelRight, setIsVisiblePanelRight] = useState(true);
  const panelLeftRef = useRef<ImperativePanelHandle>(null);
  const panelRightRef = useRef<ImperativePanelHandle>(null);

  useEffect(() => {
    if (isMobileView) {
      panelRightRef.current?.collapse();
      panelLeftRef.current?.expand();
    } else {
      panelRightRef.current?.expand();
      panelLeftRef.current?.expand();
    }
  }, [isMobileView]);

  const handleOpenRight = () => {
    panelRightRef.current?.expand();
    if (isMobileView) {
      panelLeftRef.current?.collapse();
    }
  };

  const handleOpenLeft = () => {
    panelLeftRef.current?.expand();
    if (isMobileView) {
      panelRightRef.current?.collapse();
    }
  };

  return {
    isVisiblePanelLeft,
    setIsVisiblePanelLeft,
    isVisiblePanelRight,
    setIsVisiblePanelRight,
    panelLeftRef,
    panelRightRef,
    handleOpenRight,
    handleOpenLeft,
  };
};
