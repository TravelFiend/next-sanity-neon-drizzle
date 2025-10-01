import Link from 'next/link';
import ContentWrapper from '@/components/common/ContentWrapper';

type AccountPageLayoutProps = {
  children: React.ReactNode;
};

export default async function AccountPageLayout({
  children
}: AccountPageLayoutProps) {
  return (
    <ContentWrapper>
      <section className="my-16 flex h-5/6 w-full">
        <ul className="w-1/4 p-10">
          <li>
            <Link href={'/account'}>Profile</Link>
          </li>
          <li>
            <Link href={'/account/orders'}>Orders</Link>
          </li>
          <li>
            <Link href={'/account/settings'}>Account Settings</Link>
          </li>
        </ul>

        <div className="w-0.5 border border-slate-400" />

        <div className="flex w-3/4 flex-col justify-around p-10">
          {children}
        </div>
      </section>
    </ContentWrapper>
  );
}
