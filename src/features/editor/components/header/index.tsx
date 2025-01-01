import { Separator } from '@radix-ui/react-separator';
import { useMemo } from 'react';

import { ActionButtons } from './action-buttons';
import { InfoTitle } from './info';
import { LayoutDirectionToggler } from './layout-direction-toggler';
import { MainMenu } from './main-menu';
import { OpenInSite } from './open-in-site';
import { SharingMenu } from './sharing-menu';
import { BottomHeaderUntrustedModeSign } from './untrusted-mode-sign';

export const Header = () => {
  const isIframe = useMemo(() => window.self !== window.top, []);

  return (
    <>
      <header className="flex w-full flex-wrap justify-between gap-4 px-4 py-2">
        <div className="flex flex-wrap items-center gap-1 ">
          <MainMenu />
        </div>

        <div className="hidden flex-1 gap-1 overflow-hidden sm:flex">
          <InfoTitle />
        </div>

        <div className="flex flex-1 flex-wrap justify-end gap-3 sm:flex-none">
          {isIframe && <OpenInSite />}
          {!isIframe && <SharingMenu />}
          <LayoutDirectionToggler />
          <ActionButtons />
        </div>
      </header>
      <BottomHeaderUntrustedModeSign />
      <Separator className="bg-border h-px" />
    </>
  );
};
