import ContentWrapper from '@/components/common/ContentWrapper';

const ArtistPage = async ({ params }) => {
  const { artist } = await params;
  return <ContentWrapper>{artist}</ContentWrapper>;
};

export default ArtistPage;
