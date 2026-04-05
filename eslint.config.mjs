import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextVitals from 'eslint-config-next/core-web-vitals';
import storybook from 'eslint-plugin-storybook';
import pluginJest from 'eslint-plugin-jest';
import drizzle from 'eslint-plugin-drizzle';
import studio from '@sanity/eslint-config-studio';
import importPlugin from 'eslint-plugin-import';

const eslintConfig = defineConfig([
  {
    files: ['src/sanity/**/*.{js,jsx,ts,tsx}'],
    ...studio[0]
  },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    ...tseslint.configs.recommended[0],
    rules: {
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': ['error'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    }
  },
  ...nextVitals,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { drizzle },
    rules: {
      ...drizzle.configs.recommended.rules
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
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: { import: importPlugin },
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
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-page-custom-font': 'warn',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-title-in-document-head': 'error',
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
      'no-unused-vars': 'off',
      'prefer-const': ['error', { destructuring: 'all' }],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'space-before-blocks': ['error', 'always']
    }
  },
  {
    files: ['src/db/seeds/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-console': 'off'
    }
  },
  ...storybook.configs['flat/recommended'],
  globalIgnores([
    '**/node_modules/**',
    '**/dist/**',
    '**/coverage/**',
    '**/.env*',
    '**/.sanity/**',
    '**/README.md',
    '**/src/sanity/types/generatedTypes.ts',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts'
  ])
]);

export default eslintConfig;
