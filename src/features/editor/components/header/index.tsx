import { Separator } from '@radix-ui/react-separator';
import { useMemo } from 'react';

import { ActionButtons } from './action-buttons';
import { LayoutDirectionToggler } from './layout-direction-toggler';
import { MainMenu } from './main-menu';
import { OpenInSite } from './open-in-site';
import { SharingMenu } from './sharing-menu';
import { Title, TitleProvider } from './title';
import { BottomHeaderUntrustedModeSign } from './untrusted-mode-sign';

export const Header = () => {
  const isIframe = useMemo(() => window.self !== window.top, []);

  return (
    <TitleProvider>
      <header>
        <div className="flex w-full items-center space-x-4 px-4 py-2">
          <div className="my-auto flex w-full min-w-28 flex-col overflow-hidden sm:w-auto sm:min-w-0 sm:flex-none">
            <MainMenu />
            <div className="sm:hidden">
              <Title />
            </div>
          </div>

          <div className="my-auto hidden w-full min-w-32 overflow-hidden sm:flex">
            <Title />
          </div>

          <div className="flex space-x-3">
            {isIframe && <OpenInSite />}
            {!isIframe && <SharingMenu />}
            <LayoutDirectionToggler />
            <ActionButtons />
          </div>
        </div>
      </header>
      <BottomHeaderUntrustedModeSign />
      <Separator className="bg-border h-px" />
    </TitleProvider>
  );
};
