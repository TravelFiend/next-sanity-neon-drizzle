import { fixupConfigRules } from '@eslint/compat';
import js from '@eslint/js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import _import from 'eslint-plugin-import';
import pluginJest from 'eslint-plugin-jest';
import { FlatCompat } from '@eslint/eslintrc';
import studio from '@sanity/eslint-config-studio';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

const eslintConfig = [
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/coverage',
      '**/.env*',
      '**/README.md'
    ]
  },
  ...studio,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.test.js'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
  ...fixupConfigRules(
    compat.extends(
      'prettier'
    )
  ),
  {
    settings: {
      'import/resolver': {
        node: { paths: ['src'], extensions: ['.js', '.jsx', '.ts', '.tsx'] },

        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    },
    rules: {
      'arrow-parens': ['error', 'as-needed'],
      'comma-dangle': ['error', 'never'],
      'consistent-return': 0,
      'consistent-this': ['error', 'that'],
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'id-length': ['error', { min: 3, exceptions: ['S', 'of', 'to'] }],
      'import/no-anonymous-default-export': 'error',
      'import/order': ['error', { groups: ['builtin'] }],
      'import/no-unresolved': 'error',
      'lines-around-comment': 0,
      'no-alert': 'error',
      'no-console': 'error',
      'no-implicit-coercion': 0,
      'no-negated-condition': 'error',
      'no-new': 'error',
      'no-unexpected-multiline': 'error',
      'no-unused-vars': 'error',
      'operator-linebreak': ['error', 'before'],
      'prefer-const': ['error', { destructuring: 'all' }],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],
      'space-before-blocks': ['error', 'always'],
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-page-custom-font': 'warn',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-title-in-document-head': 'error'
    }
  }
];

export default eslintConfig;
