import { Separator } from '@radix-ui/react-separator';
import { useMemo } from 'react';

import { ActionButtons } from './action-buttons';
import { AutorunToggler } from './autorun-toggler';
import { MainMenu } from './main-menu';
import { OpenInSite } from './open-in-site';
import { SharingMenu } from './sharing-menu';
import {
  BottomHeaderUntrustedModeSign,
  UntrustedModeSign,
} from './untrusted-mode-sign';

export const Header = () => {
  const isIframe = useMemo(() => window.self !== window.top, []);

  return (
    <>
      <header className="flex w-full flex-wrap justify-between px-4 py-2">
        <div className="flex flex-1 flex-wrap items-center gap-1">
          <MainMenu />
        </div>

        <div className="hidden flex-1 justify-center sm:flex">
          <UntrustedModeSign />
        </div>

        <div className="flex flex-1 flex-wrap justify-end gap-3">
          {isIframe && <OpenInSite />}
          {!isIframe && <SharingMenu />}
          <AutorunToggler />
          <ActionButtons />
        </div>
      </header>
      <BottomHeaderUntrustedModeSign />
      <Separator className="bg-border h-px" />
    </>
  );
};
