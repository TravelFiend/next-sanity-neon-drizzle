/* eslint-disable @typescript-eslint/no-explicit-any */
import { GlobalRegistrator } from '@happy-dom/global-registrator';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect as bunExpect } from 'bun:test';
import { toHaveNoViolations } from 'jest-axe';

GlobalRegistrator.register();

// Extend Bun's expect with jest-dom and jest-axe matchers
bunExpect.extend({
  ...(matchers as any),
  ...(toHaveNoViolations as any)
});

export { bunExpect as expect };
