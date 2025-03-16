import ContentWrapper from '@/components/common/ContentWrapper';

const ArtistPage = async ({ params }) => {
  const { discipline } = await params;
  return <ContentWrapper>{discipline}</ContentWrapper>;
};

export default ArtistPage;
