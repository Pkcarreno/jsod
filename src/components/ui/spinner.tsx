import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/lib/utils';

const spinnerVariants = cva('-ml-1 mr-3 animate-spin', {
  variants: {
    variant: {
      default: 'text-primary-foreground dark:text-primary',
      light: 'text-primary',
    },
    size: {
      sm: 'size-3',
      rg: 'size-5',
      lg: 'size-7',
      icon: 'size-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'rg',
  },
});

export interface DivProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  asChild?: boolean;
}

const Spinner = React.forwardRef<SVGSVGElement, DivProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <svg
        className={cn(spinnerVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  },
);
Spinner.displayName = 'Spinner';

export { Spinner, spinnerVariants };
