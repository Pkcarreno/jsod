import { CodeIcon, ListBulletIcon } from '@radix-ui/react-icons';
import React from 'react';

import { useLogsStore } from '../../stores/editor';
import { BottomTabsContainer, BottomTabsTab } from '../ui/bottom-tabs';
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
        icon={CodeIcon}
        onClick={onLeftClick}
        isActive={isLeftActive}
      />
      <BottomTabsTab
        label="Output"
        icon={ListBulletIcon}
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
