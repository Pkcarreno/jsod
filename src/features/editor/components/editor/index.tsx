import { esLint, javascript } from '@codemirror/lang-javascript';
import { linter, lintGutter } from '@codemirror/lint';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import CodeMirror from '@uiw/react-codemirror';
import * as eslint from 'eslint-linter-browserify';
import { useMemo, useRef } from 'react';

import { useTheme } from '@/hooks/use-theme';
import { debounce } from '@/lib/debounce';

import { useUntrustedMode } from '../../hooks/use-untrusted-mode';
import { useCodeStore } from '../../stores/editor';
import { themeInit } from './theme';

const darkTheme = themeInit({ theme: 'dark' });
const lightTheme = themeInit({ theme: 'light' });

const EsLintConfig = {
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
    },
  },
  rules: {
    semi: ['error', 'never'],
  },
};

const extensions: ReactCodeMirrorProps['extensions'] = [
  basicSetup({
    foldGutter: false,
    dropCursor: false,
    allowMultipleSelections: true,
    indentOnInput: true,
    autocompletion: true,
    closeBrackets: true,
    bracketMatching: true,
  }),
  javascript(),
  lintGutter(),
  // @ts-expect-error: type incompatible but are the same
  linter(esLint(new eslint.Linter(), EsLintConfig)),
];

export const CodemirrorEditor = () => {
  const { themeMode } = useTheme();
  const { code, setCode } = useCodeStore();
  const { isUntrustedMode, isUnedited, setUnedited } = useUntrustedMode();
  const codeRef = useRef<string | null>(null);

  codeRef.current = code;

  const handleSetCode = () => {
    setCode(codeRef.current ?? '');
    if (isUnedited) setUnedited(false);
  };

  const debouncedSetCode = useMemo(() => {
    return debounce(100, handleSetCode);
  }, [handleSetCode]);

  const handleEditorChange: ReactCodeMirrorProps['onChange'] = async (
    value,
  ) => {
    codeRef.current = value;
    debouncedSetCode();
  };

  const getCurrentTheme = useMemo(() => {
    return themeMode === 'dark' ? darkTheme : lightTheme;
  }, [themeMode]);

  return (
    <CodeMirror
      value={codeRef.current ?? ''}
      theme={getCurrentTheme}
      lang="javascript"
      height="100%"
      style={{ height: '100%', overflow: 'auto', fontSize: '.9rem' }}
      readOnly={isUntrustedMode}
      extensions={extensions}
      onChange={handleEditorChange}
      spellCheck={false}
      translate="no"
    />
  );
};
