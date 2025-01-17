import JV from '@uiw/react-json-view';
import { Check, Copy } from 'lucide-react';
import React from 'react';

import { JsonViewTheme } from './theme';

type Props = React.ComponentProps<typeof JV>;

export const JsonView: React.FC<Props> = (props) => {
  return (
    <JV
      collapsed={0}
      enableClipboard={true}
      objectSortKeys={true}
      displayDataTypes={false}
      style={JsonViewTheme}
      {...props}
    >
      <JV.Copied
        render={({
          // @ts-expect-error: Looks like data-copied doesn't exist, but it's needed
          'data-copied': isCopied,
          children: _children,
          className: _className,
          ...props
        }) => {
          if (isCopied) {
            return (
              <Check
                color="var(--w-rjv-copied-success-color)"
                {...props}
                fill="none"
              />
            );
          }
          return (
            <Copy color="var(--w-rjv-copied-color)" {...props} fill="none" />
          );
        }}
      />
    </JV>
  );
};
