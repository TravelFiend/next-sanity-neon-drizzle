import ContentWrapper from '@/components/common/ContentWrapper';
import { ReactNode } from 'react';

type CheckoutPageLayoutProps = {
  children: ReactNode;
};

export default function CheckoutPageLayout({
  children
}: CheckoutPageLayoutProps) {
  return <ContentWrapper justify="center">{children}</ContentWrapper>;
}
