import { mock } from 'bun:test';

export const setupPathnameMock = async (initialPath = '/') => {
  let pathname = initialPath;

  await mock.module('next/navigation', () => ({
    usePathname: () => pathname
  }));

  const setPathname = (newPath: string) => {
    pathname = newPath;
  };

  return { setPathname };
};
