import ContentWrapper from '@/components/common/ContentWrapper';
import React from 'react';

type CheckoutPageLayoutProps = {
  children: React.ReactNode;
};

export default function CheckoutPageLayout({
  children
}: CheckoutPageLayoutProps) {
  return <ContentWrapper>{children}</ContentWrapper>;
}
