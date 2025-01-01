import React from 'react';

import { MobileFooter } from './mobile-footer';
import type { FooterProps } from './types';

type Props = FooterProps;

export const Footer: React.FC<Props> = ({ ...footerProps }) => {
  return (
    <>
      <MobileFooter className="flex md:hidden" {...footerProps} />
    </>
  );
};
