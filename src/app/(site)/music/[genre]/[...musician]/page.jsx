import ContentWrapper from '@/components/common/ContentWrapper';

const ArtistPage = async ({ params }) => {
  const { musician } = await params;
  return <ContentWrapper>{musician}</ContentWrapper>;
};

export default ArtistPage;
