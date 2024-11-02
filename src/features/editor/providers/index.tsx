import React from 'react';

import { EditorBehaviorProvider } from './editor-behavior';
import { FirstTimeDialogProvider } from './first-time-dialog-provider';
import { HelpProvider } from './help-provider';
import { MetatagsProvider } from './meta-provider';
import { SettingsDialogProvider } from './settings-dialog-provider';
import { UntrustedModeProvider } from './untrusted-mode-provider';

interface Props {
  children: React.ReactNode;
}

const EditorProviders: React.FC<Props> = ({ children }) => {
  return (
    <FirstTimeDialogProvider>
      <UntrustedModeProvider>
        <MetatagsProvider>
          <HelpProvider>
            <SettingsDialogProvider>
              <EditorBehaviorProvider>
                <>{children}</>
              </EditorBehaviorProvider>
            </SettingsDialogProvider>
          </HelpProvider>
        </MetatagsProvider>
      </UntrustedModeProvider>
    </FirstTimeDialogProvider>
  );
};

export default EditorProviders;
