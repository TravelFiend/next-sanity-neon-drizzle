import { GlobalRegistrator } from '@happy-dom/global-registrator';

GlobalRegistrator.register();

const matchers = await import('@testing-library/jest-dom/matchers');
const { expect: bunExpect } = await import('bun:test');
const { toHaveNoViolations } = await import('jest-axe');

// Extend Bun's expect with jest-dom and jest-axe matchers
bunExpect.extend({
  ...(matchers as any),
  ...(toHaveNoViolations as any)
});
