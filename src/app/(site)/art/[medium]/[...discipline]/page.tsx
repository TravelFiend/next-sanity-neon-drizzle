import ContentWrapper from '@/components/common/ContentWrapper';

const DisciplinePage = async ({
  params
}: {
  params: Promise<{ discipline: string }>;
}) => {
  const { discipline } = await params;
  return <ContentWrapper>{discipline}</ContentWrapper>;
};

export default DisciplinePage;
