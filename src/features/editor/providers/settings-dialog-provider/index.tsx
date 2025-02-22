import React, { createContext, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { DevelopmentSettings } from './development';
import { EditorSettings } from './editor';
import { RuntimeSettings } from './runtime-settings';

type SettingsDialogState = {
  isSettingsOpen: boolean;
  setSettingsOpen: (value: boolean) => void;
};

const initialState = {
  isSettingsOpen: false,
  setSettingsOpen: () => null,
};

export const SettingsDialogContext =
  createContext<SettingsDialogState>(initialState);

interface Props {
  children?: React.ReactNode;
}

export const SettingsDialogProvider: React.FC<Props> = ({ children }) => {
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const value = { isSettingsOpen, setSettingsOpen };

  return (
    <SettingsDialogContext.Provider value={value}>
      {children}

      <Dialog open={isSettingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              customize your coding experience.
            </DialogDescription>
          </DialogHeader>

          <Separator />
          <RuntimeSettings />
          <Separator />
          <EditorSettings />
          <Separator />
          <DevelopmentSettings />
        </DialogContent>
      </Dialog>
    </SettingsDialogContext.Provider>
  );
};
