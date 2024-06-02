import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import JV from '@uiw/react-json-view';
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
          ...props
        }) => {
          if (isCopied) {
            return (
              <CheckIcon color="var(--w-rjv-copied-success-color)" {...props} />
            );
          }
          return <CopyIcon color="var(--w-rjv-copied-color)" {...props} />;
        }}
      />
    </JV>
  );
};
