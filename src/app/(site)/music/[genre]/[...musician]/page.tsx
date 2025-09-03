import ContentWrapper from '@/components/common/ContentWrapper';

export default async function MusicianPage({
  params
}: {
  params: Promise<{ musician: string }>;
}) {
  const { musician } = await params;
  return <ContentWrapper>{musician}</ContentWrapper>;
}
