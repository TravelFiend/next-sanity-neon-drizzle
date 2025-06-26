import ContentWrapper from '@/components/common/ContentWrapper';

const MusicGenrePage = async ({
  params
}: {
  params: Promise<{ genre: string }>;
}) => {
  const { genre } = await params;
  return <ContentWrapper>{genre}</ContentWrapper>;
};

export default MusicGenrePage;
