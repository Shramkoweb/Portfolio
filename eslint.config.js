import globals from 'globals';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import tseslint from 'typescript-eslint';

// mimic CommonJS variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  {
    // Global ignores
    ignores: [
      'node_modules/',
      '.next/',
      'lib/scripts/',
      'coverage/',
      'public/',
      '**/*.config.js',
      '**/*.config.ts',
      '**/*.config.mjs',
      '.swc/',
      'instrumentation.ts',
      'sentry.client.config.ts',
      'postcss.config.js',
      'tailwind.config.js',
      'commitlint.config.ts',
      'jest.config.js',
      'jest.setup.js',
      'next-sitemap.config.js',
      'eslint.config.js',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // From old .eslintrc.json, removing airbnb ones
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-no-target-blank': [
        'error',
        {
          allowReferrer: true,
        },
      ],
      'max-len': [
        'error',
        {
          code: 120,
          ignoreStrings: true,
        },
      ],
      'react/require-default-props': 'off',
      'import/prefer-default-export': 'off',
      'no-console': 'error',
      'jsx-a11y/anchor-is-valid': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  }
).concat(...compat.extends('next/core-web-vitals'));
