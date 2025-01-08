import { PauseIcon, PlayIcon, SlashIcon } from '@radix-ui/react-icons';
import type { DynamicAnimationOptions } from 'motion';
import type { MotionStyle } from 'motion/react';
import { useAnimate } from 'motion/react';
import React, { useCallback, useEffect, useMemo } from 'react';

import { cn } from '@/lib/utils';

import { useExecutionLayer } from '../../hooks/use-execution-layer';
import type { ExecutionStatusType } from '../../providers/execution-layer';

export const ActionButtons = () => {
  const { status, runExec, stopExec } = useExecutionLayer();

  return (
    <AnimatedActionButton
      state={status}
      stopExec={stopExec}
      runExec={runExec}
    />
  );
};

export type AnimatedActionButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    state: ExecutionStatusType;
    stopExec: () => void;
    runExec: () => void;
  };

export const AnimatedActionButton: React.FC<AnimatedActionButtonProps> = ({
  state,
  runExec,
  stopExec,
}) => {
  const scope = useButtonAnimation(state);

  const isDisabled = useMemo(() => {
    if (state === 'running') return true;
    return false;
  }, [state]);

  const handleExecution = useCallback(() => {
    if (state === 'idle') return runExec();
    return stopExec();
  }, [state, stopExec, runExec]);

  const classNamesByState = useMemo(() => {
    if (state === 'overflow')
      return 'bg-destructive text-destructive-foreground shadow-sm hover:!bg-destructive/90';

    if (state === 'idle')
      return 'bg-primary text-primary-foreground shadow hover:!bg-primary/90';

    return '';
  }, [state]);

  return (
    <div ref={scope} className="size-9 overflow-hidden">
      <button
        className={cn(
          'focus-visible:ring-ring [&_svg]:shrink-0" box-border inline-flex size-9 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4',
          classNamesByState,
        )}
        onClick={handleExecution}
        disabled={isDisabled}
      >
        <LoadingIcon id="icon-loading" />
        <PauseIcon id="icon-pause" className="relative inline-block size-5" />
        <SlashIcon
          id="icon-running"
          className="relative inline-block size-5 animate-spin"
        />
        <PlayIcon id="icon-play" className="relative inline-block size-5" />
      </button>
    </div>
  );
};

const BASE_ICON_STYLES: MotionStyle = {
  display: 'none',
  rotate: 45,
};
const BASE_ICON_OPTIONS: DynamicAnimationOptions = {
  duration: 0.1,
};
const CURRENT_ICON_STYLES: MotionStyle = {
  display: 'block',
  position: 'absolute',
  rotate: 0,
};
const CURRENT_ICON_OPTIONS: DynamicAnimationOptions = {
  duration: 0.1,
  delay: 0.1,
};
const BUTTON_PRIMARY_STYLES: MotionStyle = {
  backgroundColor: 'hsl(var(--primary))',
  color: 'hsl(var(--primary-foreground))',
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
};

const BUTTON_DESTRUCTIVE_STYLES: MotionStyle = {
  backgroundColor: 'hsl(var(--destructive))',
  color: 'hsl(var(--destructive-foreground))',
  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
};
const BUTTON_OPTIONS = {
  duration: 0.3,
  at: '>',
};

const useButtonAnimation = (state: ExecutionStatusType) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    switch (state) {
      case 'idle':
        animate([
          ['#icon-pause', BASE_ICON_STYLES, BASE_ICON_OPTIONS],
          ['#icon-running', BASE_ICON_STYLES, BASE_ICON_OPTIONS],
          ['#icon-loading', BASE_ICON_STYLES, BASE_ICON_OPTIONS],
          ['#icon-play', CURRENT_ICON_STYLES, CURRENT_ICON_OPTIONS],
          ['button', BUTTON_PRIMARY_STYLES, BUTTON_OPTIONS],
        ]);
        break;
      case 'waiting':
        animate([
          ['#icon-pause', BASE_ICON_STYLES, BASE_ICON_OPTIONS],
          ['#icon-running', BASE_ICON_STYLES, BASE_ICON_OPTIONS],
          ['#icon-play', BASE_ICON_STYLES, BASE_ICON_OPTIONS],
          ['#icon-loading', CURRENT_ICON_STYLES, CURRENT_ICON_OPTIONS],
          ['button', BUTTON_PRIMARY_STYLES, BUTTON_OPTIONS],
        ]);
        break;
      case 'running':
        animate([
          ['#icon-play', BASE_ICON_STYLES, BASE_ICON_OPTIONS],
          ['#icon-pause', BASE_ICON_STYLES, BASE_ICON_OPTIONS],
          ['#icon-loading', BASE_ICON_STYLES, BASE_ICON_OPTIONS],
          ['#icon-running', CURRENT_ICON_STYLES, CURRENT_ICON_OPTIONS],
          ['button', BUTTON_PRIMARY_STYLES, BUTTON_OPTIONS],
        ]);
        break;
      case 'overflow':
        animate([
          ['#icon-play', BASE_ICON_STYLES, BASE_ICON_OPTIONS],
          ['#icon-running', BASE_ICON_STYLES, BASE_ICON_OPTIONS],
          ['#icon-loading', BASE_ICON_STYLES, BASE_ICON_OPTIONS],
          ['#icon-pause', CURRENT_ICON_STYLES, CURRENT_ICON_OPTIONS],
          ['button', BUTTON_DESTRUCTIVE_STYLES, BUTTON_OPTIONS],
        ]);
        break;
    }
  }, [state]);

  return scope;
};

interface LoadingIconProps {
  id?: string;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ id }) => {
  return (
    <svg
      id={id}
      fill="hsl(var(--primary-foreground))"
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="12" r="3">
        <animate
          id="spinner_qFRN"
          begin="0;spinner_OcgL.end+0.25s"
          attributeName="cy"
          calcMode="spline"
          dur="0.6s"
          values="12;6;12"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
        />
      </circle>
      <circle cx="12" cy="12" r="3">
        <animate
          begin="spinner_qFRN.begin+0.1s"
          attributeName="cy"
          calcMode="spline"
          dur="0.6s"
          values="12;6;12"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
        />
      </circle>
      <circle cx="20" cy="12" r="3">
        <animate
          id="spinner_OcgL"
          begin="spinner_qFRN.begin+0.2s"
          attributeName="cy"
          calcMode="spline"
          dur="0.6s"
          values="12;6;12"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
        />
      </circle>
    </svg>
  );
};
