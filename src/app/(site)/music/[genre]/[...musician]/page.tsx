import ContentWrapper from '@/components/common/ContentWrapper';

const MusicianPage = async ({
  params
}: {
  params: Promise<{ musician: string }>;
}) => {
  const { musician } = await params;
  return <ContentWrapper>{musician}</ContentWrapper>;
};

export default MusicianPage;
