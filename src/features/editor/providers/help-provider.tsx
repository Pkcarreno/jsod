import React, { createContext, useState } from 'react';

import { InlineCode, Paragraph, UnorderedList } from '@/components/typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type HelpState = {
  isHelpDialogOpen: boolean;
  closeHelpDialog: () => void;
  openHelpDialog: () => void;
};

const initialState: HelpState = {
  isHelpDialogOpen: false,
  closeHelpDialog: () => null,
  openHelpDialog: () => null,
};

export const HelpContext = createContext<HelpState>(initialState);

interface Props {
  children: React.ReactNode;
}

export const HelpProvider: React.FC<Props> = ({ children }) => {
  const [isHelpDialogOpen, setHelpDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setHelpDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setHelpDialogOpen(true);
  };

  const value = {
    isHelpDialogOpen,
    closeHelpDialog: handleCloseDialog,
    openHelpDialog: handleOpenDialog,
  };

  return (
    <HelpContext.Provider value={value}>
      {children}
      <Dialog open={isHelpDialogOpen} onOpenChange={setHelpDialogOpen}>
        <HelpInfo />
      </Dialog>
    </HelpContext.Provider>
  );
};

// eslint-disable-next-line max-lines-per-function
const HelpInfo = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Frequently Asked Questions</DialogTitle>
      </DialogHeader>
      <Accordion type="single" collapsible>
        <AccordionItem value="faq-1">
          <AccordionTrigger>
            How do I preview the output of my code?
          </AccordionTrigger>
          <AccordionContent>
            <Paragraph>
              To display the results you must use the{' '}
              <InlineCode>console</InlineCode> global object, currently
              supported methods are:
            </Paragraph>
            <UnorderedList>
              <li>log</li>
              <li>info</li>
              <li>error</li>
              <li>warn</li>
            </UnorderedList>
            <Paragraph>
              Example: <InlineCode>console.log('hello world!')</InlineCode>.
            </Paragraph>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-2">
          <AccordionTrigger>
            Where is the code to be shared stored?
          </AccordionTrigger>
          <AccordionContent>
            <Paragraph>
              When the code is shared, it is stored in the link itself. That is
              why the more code there is, the longer the link tends to be.
            </Paragraph>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-3">
          <AccordionTrigger>
            Does the code leave my browser to run in the cloud?
          </AccordionTrigger>
          <AccordionContent>
            <Paragraph>
              No, all code runs in your own browser through quickjs. Creating a
              unique sandbox environment for its execution.
            </Paragraph>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-4">
          <AccordionTrigger>
            Is it dangerous to run code shared by third parties?
          </AccordionTrigger>
          <AccordionContent>
            <Paragraph>
              Quickjs and the library that wraps its functions used in this app
              (
              <a
                href="https://github.com/justjake/quickjs-emscripten"
                className="hover:underline"
              >
                quickjs-emscripten
              </a>
              ) try to generate a secure and separate execution environment,
              which guarantees the security of your data, regardless of the code
              that is going to be executed. In the same way, this app tries to
              apply the necessary security measures to isolate vulnerabilities
              according to the implementation of the above mentioned library.
            </Paragraph>
            <Paragraph>
              However, there is always the possibility that there are
              vulnerabilities in the process unknown at the moment. Therefore,
              it is advisable to deeply understand the purpose of the code
              before executing it, and if in doubt, do not execute it. You can
              always use the untrusted mode to analyze the code without actually
              executing it.
            </Paragraph>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-5">
          <AccordionTrigger>
            None of these responses answered my questions
          </AccordionTrigger>
          <AccordionContent>
            You can leave your questions in the{' '}
            <a
              href="https://github.com/Pkcarreno/jsod/issues"
              className="hover:underline"
            >
              project repository
            </a>
            .
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </DialogContent>
  );
};
