import ContentWrapper from '@/components/common/ContentWrapper';

const ArtMediumPage = async ({ params }) => {
  const { medium } = await params;
  return <ContentWrapper>{medium}</ContentWrapper>;
};

export default ArtMediumPage;
