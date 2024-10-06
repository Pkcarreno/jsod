import { esLint, javascript } from '@codemirror/lang-javascript';
import { linter, lintGutter } from '@codemirror/lint';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { worker as globalsWorker } from 'globals';

const EsLintConfig = {
  languageOptions: {
    globals: {
      ...globalsWorker,
      console: true,
    },
    parserOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
    },
  },
  rules: {
    semi: ['error', 'never'],
  },
};

const newLinter = async () => {
  const { ...eslint } = await import('eslint-linter-browserify');
  return new eslint.Linter();
};

export const getExtensions = async () => {
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
    linter(esLint(await newLinter(), EsLintConfig)),
  ];

  return extensions;
};
