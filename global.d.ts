import 'bun:test';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'bun:test' {
  interface Matchers<TResult> extends TestingLibraryMatchers<TResult> {
    toHaveNoViolations(): TResult;
  }
}

declare global {
  namespace Expect {
    interface Matchers<R = unknown, T = unknown>
      extends TestingLibraryMatchers<R, T> {
      toHaveNoViolations(): R;
    }
  }
}
