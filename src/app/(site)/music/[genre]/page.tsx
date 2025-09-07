import ContentWrapper from '@/components/common/ContentWrapper';

export default async function MusicGenrePage({
  params
}: {
  params: Promise<{ genre: string }>;
}) {
  const { genre } = await params;
  return <ContentWrapper>{genre}</ContentWrapper>;
}
