import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';

import { Loading } from '@/components/loading';
import { useTheme } from '@/hooks/use-theme';
import { debounce } from '@/lib/debounce';

import { useUntrustedMode } from '../../hooks/use-untrusted-mode';
import { useCodeStore } from '../../stores/editor';
import { useSettingsStore } from '../../stores/settings';
import { themeInit } from './theme';

const CodeMirror = lazy(() => import('@uiw/react-codemirror'));

const darkTheme = themeInit({ theme: 'dark' });
const lightTheme = themeInit({ theme: 'light' });

export const CodemirrorEditor = () => {
  const { themeMode } = useTheme();
  const { code, setCode } = useCodeStore();
  const { vimMode, editorPlaceholder } = useSettingsStore();
  const { isUntrustedMode, isUnedited, setUnedited } = useUntrustedMode();
  const codeRef = useRef<string | null>(null);
  const [extensions, setExtensions] = useState<
    ReactCodeMirrorProps['extensions']
  >([]);

  const getMemoExtensions = useMemo(async () => {
    const lib = await import('./cm-extensions');
    const res = await lib.getExtensions({
      vimMode,
    });
    return res;
  }, [vimMode]);

  const loadExtensions = async () => {
    const ext = await getMemoExtensions;
    setExtensions(ext);
  };

  useEffect(() => {
    loadExtensions();
  }, [vimMode]);

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
    <Suspense fallback={<Loading />}>
      <CodeMirror
        value={codeRef.current ?? ''}
        theme={getCurrentTheme}
        lang="javascript"
        height="100%"
        style={{ height: '100%', overflow: 'auto', fontSize: '.9rem' }}
        readOnly={isUntrustedMode}
        extensions={extensions}
        onChange={handleEditorChange}
        placeholder={editorPlaceholder ? placeholderContent : undefined}
        spellCheck={false}
        translate="no"
      />
    </Suspense>
  );
};

export default CodemirrorEditor;

const placeholderContent = `Welcome to JSoD!

To log the data to print you must
use the \`console\` global object,
the supported methods are:

- \`console.log\`
- \`console.info\`
- \`console.error\`
- \`console.warn\`

Note: you can hide this text from
the settings menu, click on
JSoD -> Settings -> under “Editor”
toggle “Placeholder”.`;
