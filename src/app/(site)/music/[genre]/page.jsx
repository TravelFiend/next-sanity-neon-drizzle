import ContentWrapper from '@/components/common/ContentWrapper';

const MusicGenrePage = async ({ params }) => {
  const { genre } = await params;
  return <ContentWrapper>{genre}</ContentWrapper>;
};

export default MusicGenrePage;
