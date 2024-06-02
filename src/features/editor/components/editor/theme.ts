import { tags as t } from '@lezer/highlight';
import type { CreateThemeOptions } from '@uiw/codemirror-themes';
import { createTheme } from '@uiw/codemirror-themes';

export const defaultThemeSettings: CreateThemeOptions['settings'] = {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  selection: 'hsl(var(--primary) / 0.3)',
  selectionMatch: 'hsl(var(--primary) / 0.2)',
  lineHighlight: 'hsl(var(--primary) / 0.1)',
  gutterBackground: 'hsl(var(--background))',
  gutterForeground: 'hsl(var(--muted-foreground) / 0.5)',
  gutterBorder: 'hsl(var(--border))',
  gutterActiveForeground: 'hsl(var(--extra))',
  caret: 'hsl(var(--accent-foreground))',
  fontFamily: "'IBM Plex Mono', monospace",
};

export const themeInit = (options?: Partial<CreateThemeOptions>) => {
  const { theme = 'light', settings = {}, styles = [] } = options || {};

  return createTheme({
    theme: theme,
    settings: {
      ...defaultThemeSettings,
      ...settings,
    },

    styles: [
      {
        tag: [t.comment],
        color: 'hsl(var(--muted))',
      },
      {
        tag: [t.bracket, t.punctuation, t.operator],
        color: 'hsl(var(--subtle))',
      },
      {
        tag: [t.function(t.variableName), t.meta],
        color: 'hsl(var(--plain))',
      },
      {
        tag: [
          t.constant(t.variableName),
          t.definition(t.variableName),
          t.number,
          t.invalid,
        ],
        color: 'hsl(var(--yell))',
      },
      {
        tag: [t.typeName, t.className, t.function(t.className), t.name],
        color: 'hsl(var(--speak))',
      },
      {
        tag: [t.variableName],
        color: 'hsl(var(--whisper))',
      },
      {
        tag: [t.string],
        color: 'hsl(var(--shy))',
      },
      {
        tag: [t.logicOperator, t.keyword, t.regexp],
        color: 'hsl(var(--extra))',
      },

      { tag: t.link, textDecoration: 'underline' },
      ...styles,
    ],
  });
};
