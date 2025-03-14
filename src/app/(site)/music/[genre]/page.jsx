import ContentWrapper from '@/components/common/ContentWrapper';

const ArtMediumPage = async ({ params }) => {
  const { genre } = await params;
  return <ContentWrapper>{genre}</ContentWrapper>;
};

export default ArtMediumPage;
