import ContentWrapper from '@/components/common/ContentWrapper';

export default async function DisciplinePage({
  params
}: {
  params: Promise<{ discipline: string }>;
}) {
  const { discipline } = await params;
  return <ContentWrapper>{discipline}</ContentWrapper>;
}
