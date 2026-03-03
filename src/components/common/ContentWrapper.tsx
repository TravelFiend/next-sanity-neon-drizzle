import type { ReactNode } from 'react';

type ContentWrapperProps = {
  children: ReactNode;
};

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <div className="xs:px-12 flex min-h-screen flex-col items-center justify-start px-6 pt-12 sm:pt-16 lg:px-24">
      {children}
    </div>
  );
};

export default ContentWrapper;
