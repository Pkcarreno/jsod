import { CodeIcon, ListBulletIcon } from '@radix-ui/react-icons';
import React from 'react';

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
        onClick={onRightClick}
        isActive={isRightActive}
      />
    </BottomTabsContainer>
  );
};
