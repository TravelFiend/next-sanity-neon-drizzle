import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import storybook from 'eslint-plugin-storybook';
import pluginJest from 'eslint-plugin-jest';
import drizzle from 'eslint-plugin-drizzle';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import studio from '@sanity/eslint-config-studio';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.env*',
      '**/.sanity/**',
      '**/README.md',
      '**/src/sanity/types/generatedTypes.ts',
      '.next/**',
      'out/**',
      'build/**'
    ]
  },
  ...studio,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-page-custom-font': 'warn',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-title-in-document-head': 'error'
    }
  },
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    plugins: {
      'jsx-a11y': jsxA11y
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
      'react/prop-types': 'off'
    }
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error'
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { drizzle },
    rules: {
      ...drizzle.configs.recommended.rules
    }
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      import: importPlugin
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
          bun: true
        },
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    },
    rules: {
      'import/no-anonymous-default-export': 'error',
      'import/order': ['error', { groups: ['builtin'] }],
      'import/no-unresolved': 'error',
      'arrow-parens': ['error', 'as-needed'],
      'comma-dangle': ['error', 'never'],
      'consistent-return': 0,
      'consistent-this': ['error', 'that'],
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'id-length': ['error', { min: 2, exceptions: ['S', 'e', '_', 't', 'i'] }],
      'lines-around-comment': 0,
      'multiline-ternary': 'off',
      'no-alert': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-implicit-coercion': 0,
      'no-new': 'error',
      'no-unexpected-multiline': 'error',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'space-before-blocks': ['error', 'always']
    }
  },
  ...storybook.configs['flat/recommended']
]);
