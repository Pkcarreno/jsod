import React from 'react';

import { EditorBehaviorProvider } from './editor-behavior';
import { ExecutionLayerProvider } from './execution-layer';
import { HelpProvider } from './help-provider';
import { MetatagsProvider } from './meta-provider';
import { SettingsDialogProvider } from './settings-dialog-provider';
import { UntrustedModeProvider } from './untrusted-mode-provider';

interface Props {
  children: React.ReactNode;
}

const EditorProviders: React.FC<Props> = ({ children }) => {
  return (
    <UntrustedModeProvider>
      <MetatagsProvider>
        <HelpProvider>
          <SettingsDialogProvider>
            <EditorBehaviorProvider>
              <ExecutionLayerProvider>
                <>{children}</>
              </ExecutionLayerProvider>
            </EditorBehaviorProvider>
          </SettingsDialogProvider>
        </HelpProvider>
      </MetatagsProvider>
    </UntrustedModeProvider>
  );
};

export default EditorProviders;
