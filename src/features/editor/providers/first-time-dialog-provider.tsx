import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useSettingsStore } from '../stores/settings';

interface Props {
  children: React.ReactNode;
}

export const FirstTimeDialogProvider: React.FC<Props> = ({ children }) => {
  const { isFirstTime, updateIsFirstTime } = useSettingsStore();
  return (
    <>
      {children}
      <Dialog open={isFirstTime} onOpenChange={updateIsFirstTime}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to JSoD</DialogTitle>
            <DialogDescription>
              Write, run, and share JavaScript code instantly.
            </DialogDescription>
            <div className="text-muted-foreground text-sm">
              <span className="font-semibold">Features:</span>
              <ul className="list-inside list-disc">
                <li>
                  <a
                    className="underline underline-offset-1"
                    href="https://github.com/pkcarreno/jsod"
                    target="_blank"
                  >
                    Open source
                  </a>
                </li>
                <li>Runs 100% on your device</li>
                <li>
                  Powered by{' '}
                  <a
                    className="underline underline-offset-1"
                    href="https://github.com/justjake/quickjs-emscripten"
                    target="_blank"
                  >
                    QuickJS
                  </a>
                </li>
                <li>Share your code</li>
                <li>Installable as PWA</li>
              </ul>
            </div>
            <DialogDescription>
              <span className="font-bold">Caution!</span> Be careful when
              running third-party code. Make sure you understand its origin and
              functionality to avoid security risks.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <span className="text-xs">
              JSoD means '<span className="font-semibold">JS on Demand</span>'
              😉
            </span>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
