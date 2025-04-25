import ContentWrapper from '@/components/common/ContentWrapper';

const DisciplinePage = async ({ params }) => {
  const { discipline } = await params;
  return <ContentWrapper>{discipline}</ContentWrapper>;
};

export default DisciplinePage;
