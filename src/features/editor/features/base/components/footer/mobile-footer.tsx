import { Code, Logs } from 'lucide-react';
import React from 'react';

import {
  BottomTabsContainer,
  BottomTabsTab,
} from '@/features/editor/components/ui/bottom-tabs';
import { useLogsStore } from '@/features/editor/stores/editor';

import type { FooterProps } from './types';

interface Props
  extends FooterProps,
    Pick<React.HTMLAttributes<HTMLDivElement>, 'className'> {}

export const MobileFooter: React.FC<Props> = ({
  onLeftClick,
  isLeftActive,
  onRightClick,
  isRightActive,
  className,
}) => {
  const { alert, clearAlert } = useLogsStore();

  return (
    <BottomTabsContainer className={className}>
      <BottomTabsTab
        label="Editor"
        icon={Code}
        onClick={onLeftClick}
        isActive={isLeftActive}
      />
      <BottomTabsTab
        label="Output"
        icon={Logs}
        onClick={() => {
          onRightClick();
          clearAlert();
        }}
        showBadge={alert}
        isActive={isRightActive}
      />
    </BottomTabsContainer>
  );
};
