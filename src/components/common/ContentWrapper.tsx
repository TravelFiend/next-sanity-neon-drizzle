import conditionalClasses from '@/lib/utils/conditionalClasses';
import type { ReactNode } from 'react';

type ContentWrapperProps = {
  children: ReactNode;
  justify: 'start' | 'center';
};

const ContentWrapper = ({ children, justify }: ContentWrapperProps) => {
  return (
    <div
      className={conditionalClasses(
        'xs:px-12 flex min-h-screen flex-col items-center px-6 pt-12 sm:pt-16 lg:px-24',
        justify === 'start' ? 'justify-start' : 'justify-center'
      )}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
