import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import React, { createContext, useEffect, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useCodeStore } from '../stores/editor';
import { useSettingsStore } from '../stores/settings';

type UntrustedModeState = {
  isUntrustedMode: boolean;
  isUnedited: boolean;
  setUntrustedMode: (value: boolean) => void;
  setUnedited: (value: boolean) => void;
  setUntrustedDialogOpen: (value: boolean) => void;
};

const initialState: UntrustedModeState = {
  isUntrustedMode: false,
  isUnedited: true,
  setUntrustedMode: () => null,
  setUnedited: () => null,
  setUntrustedDialogOpen: () => null,
};

export const UntrustedModeContext =
  createContext<UntrustedModeState>(initialState);

interface Props {
  children: React.ReactNode;
}

// eslint-disable-next-line max-lines-per-function
export const UntrustedModeProvider: React.FC<Props> = ({ children }) => {
  const [isUntrustedMode, setUntrustedMode] = useState(false);
  const [isUnedited, setUnedited] = useState(true);
  const [isUntrustedDialogOpen, setUntrustedDialogOpen] = useState(false);
  const { code } = useCodeStore();
  const { isFirstTime } = useSettingsStore();

  useEffect(() => {
    if (isUnedited && code.length > 0 && !isFirstTime) {
      setUntrustedDialogOpen(true);
    }
  }, [isFirstTime]);

  useEffect(() => {
    if (isUnedited && code.length > 0) {
      setUntrustedMode(true);
    }
    if (isUnedited && code.length === 0) {
      setUntrustedMode(false);
    }
  }, []);

  const value = {
    isUntrustedMode,
    isUnedited,
    setUntrustedMode,
    setUnedited,
    setUntrustedDialogOpen,
  };

  const handleOnTrustOrigin = () => {
    setUntrustedMode(false);
    setUntrustedDialogOpen(false);
  };

  return (
    <UntrustedModeContext.Provider value={value}>
      {children}
      <Dialog
        open={isUntrustedDialogOpen}
        onOpenChange={setUntrustedDialogOpen}
      >
        <DialogContent>
          <UntrustedModeInfo />
          <DialogFooter className="flex-wrap-reverse gap-2 sm:space-x-0">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex h-fit flex-1 flex-col"
                >
                  <span className="font-semibold">
                    Yes, I trust the origin of this code.
                  </span>
                  <span className="italic">
                    Trust the code and enable all features
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction onClick={handleOnTrustOrigin}>
                    Yes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              className="flex h-fit flex-1 flex-col"
              onClick={() => setUntrustedDialogOpen(false)}
            >
              <span className="font-semibold">
                No, I don't trust the origin of this code.
              </span>
              <span className="italic">Inspect code in untrusted mode</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </UntrustedModeContext.Provider>
  );
};

const UntrustedModeInfo = () => {
  return (
    <>
      <DialogHeader className="border-destructive bg-destructive/10 text-destructive rounded-xl border p-4">
        <DialogTitle className="flex items-center justify-center gap-2 sm:flex-row">
          <ExclamationTriangleIcon className="size-6" />
          WARNING!
        </DialogTitle>
        <DialogDescription className="text-destructive">
          Although JSOD aims to provide a safe environment, there may be
          inappropriate or malicious behavior when executing third-party code.
        </DialogDescription>
      </DialogHeader>
      <DialogHeader>
        <DialogDescription>
          If you do not trust the origin of the code, we recommend continuing in
          the untrusted mode. Before executing the code, make sure you
          understand its behavior and scope.
        </DialogDescription>
        <div className="text-muted-foreground text-sm">
          <span className="font-semibold">Remember</span>

          <ul className="list-inside list-disc">
            <li>
              The security of your device and your data is your responsibility.
            </li>
            <li>
              If you have doubts about the security of the code, do not execute
              it.
            </li>
          </ul>
        </div>
      </DialogHeader>
    </>
  );
};
