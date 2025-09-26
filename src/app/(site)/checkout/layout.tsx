import ContentWrapper from '@/components/common/ContentWrapper';
import React from 'react';

type CheckoutPageLayoutProps = {
  params: Promise<{ userId: string }>;
  children: React.ReactNode;
};

const CheckoutPageLayout: React.FC<CheckoutPageLayoutProps> = ({
  params,
  children
}) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default CheckoutPageLayout;
