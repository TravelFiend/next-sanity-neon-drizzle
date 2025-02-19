import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import nextPlugin from "@next/eslint-plugin-next";
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import studio from '@sanity/eslint-config-studio';
import _import from 'eslint-plugin-import';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
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
  ...fixupConfigRules(
    compat.extends(
      'plugin:import/recommended',
      'prettier'
    )
  ),
  {
    name: "Next Plugin",
    plugins: {
      "@next/next": nextPlugin,
      rules: {
        ...nextPlugin.configs.recommended.rules,
        ...nextPlugin.configs["core-web-vitals"].rules,
      },
    },
  },
  {
    plugins: { import: fixupPluginRules(_import) },
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
]
