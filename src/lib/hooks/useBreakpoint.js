import { useState, useEffect } from 'react';

export const useBreakpoint = (
  mobileBreakpoint = 768,
  tabletBreakpoint = 1024
) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        setIsMobile(width < mobileBreakpoint);
        setIsTablet(width >= mobileBreakpoint && width < tabletBreakpoint);
        setIsDesktop(width >= tabletBreakpoint);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileBreakpoint, tabletBreakpoint]);

  return { isMobile, isTablet, isDesktop };
};
