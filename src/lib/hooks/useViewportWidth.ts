'use client';

import { useEffect, useState } from 'react';
import BREAKPOINTS from '../constants/breakpoints';

const getBreakpoint = (viewportWidth: number): string => {
  if (viewportWidth < BREAKPOINTS.sm) return 'xs';
  if (viewportWidth < BREAKPOINTS.md) return 'sm';
  if (viewportWidth < BREAKPOINTS.lg) return 'md';
  if (viewportWidth < BREAKPOINTS.xl) return 'lg';
  if (viewportWidth < BREAKPOINTS['2xl']) return 'xl';
  return '2xl';
};

const useViewportWidth = () => {
  const [breakpoint, setBreakpoint] = useState<string>('sm');

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

export default useViewportWidth;
