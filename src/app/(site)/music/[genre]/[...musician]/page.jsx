import ContentWrapper from '@/components/common/ContentWrapper';

const MusicianPage = async ({ params }) => {
  const { musician } = await params;
  return <ContentWrapper>{musician}</ContentWrapper>;
};

export default MusicianPage;
