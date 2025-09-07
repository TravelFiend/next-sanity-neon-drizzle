import ContentWrapper from '@/components/common/ContentWrapper';

export default async function ArtMediumPage({
  params
}: {
  params: Promise<{ medium: string }>;
}) {
  const { medium } = await params;
  return <ContentWrapper>{medium}</ContentWrapper>;
}
