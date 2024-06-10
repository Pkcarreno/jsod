import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwind from 'eslint-plugin-tailwindcss';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['node_modules/*', 'dev-dist/*', 'dist/*'],
  },
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          endOfLine: 'auto',
        },
      ],
      'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
      'max-params': ['error', 3], // Limit the number of parameters in a function to use object instead
      'max-lines-per-function': [
        'error',
        {
          max: 70,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
      'react/require-default-props': 'off', // Allow non-defined react props as undefined
    },
  },

  {
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    files: ['src/**/*.{ts,tsx,js}', './*.{ts,tsx,js}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ['./tsconfig.json'],
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
      },
    },
    rules: {
      '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
      '@typescript-eslint/consistent-type-imports': 'error', // Ensure `import type` is used when it's necessary
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  {
    plugins: {
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
    },
  },

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error', // Import configuration for `eslint-plugin-simple-import-sort`
      'simple-import-sort/exports': 'error', // Export configuration for `eslint-plugin-simple-import-sort`
    },
  },

  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },

  ...tailwind.configs['flat/recommended'],

  {
    settings: {
      tailwindcss: {
        callees: ['cn', 'cva'],
        config: 'tailwind.config.cjs',
      },
    },
    rules: {
      'tailwindcss/classnames-order': [
        'warn',
        {
          officialSorting: true,
        },
      ], // Follow the same ordering as the official plugin `prettier-plugin-tailwindcss`
      'tailwindcss/no-custom-classname': 'off',
    },
  },

  eslintPluginPrettierRecommended,
);
