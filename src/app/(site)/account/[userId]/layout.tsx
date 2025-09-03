import Link from 'next/link';
import ContentWrapper from '@/components/common/ContentWrapper';

type AccountPageLayoutProps = {
  params: Promise<{ userId: string }>;
  children: React.ReactNode;
};

export default async function AccountPageLayout({
  params,
  children
}: AccountPageLayoutProps) {
  const { userId } = await params;

  return (
    <ContentWrapper>
      <section className="my-16 flex h-5/6 w-full">
        <ul className="w-1/4 p-10">
          <li>
            <Link href={`/account/${userId}`}>Profile</Link>
          </li>
          <li>
            <Link href={`/account/${userId}/orders`}>Orders</Link>
          </li>
          <li>
            <Link href={`/account/${userId}/settings`}>Account Settings</Link>
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
