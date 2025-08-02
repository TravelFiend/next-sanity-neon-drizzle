import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {}
  },
  staticDirs: ['../public'],
  env: config => ({
    ...config,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''
  })
};
export default config;
