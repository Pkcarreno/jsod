import React from 'react';

import { DesktopFooter } from './desktop-footer';
import { MobileFooter } from './mobile-footer';
import type { FooterProps } from './types';

type Props = FooterProps;

export const Footer: React.FC<Props> = ({ ...footerProps }) => {
  return (
    <>
      <MobileFooter className="flex md:hidden" {...footerProps} />
      <DesktopFooter className="hidden md:flex" {...footerProps} />
    </>
  );
};
