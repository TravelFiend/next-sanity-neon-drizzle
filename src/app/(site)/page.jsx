import { getHomepage } from '@/lib/actions/groqQueries/queries/homepage';
import ContentWrapper from '@/components/common/ContentWrapper';
import ContentBlocks from '@/components/blocks/ContentBlocks';

const Home = async () => {
  const {
    data: { title, contentBlocks }
  } = await getHomepage();

  if (!title || !contentBlocks)
    throw new Error('Sanity homepage data not found');

  return (
    <ContentWrapper>
      <div>{title && title}</div>
      <ContentBlocks contentBlocks={contentBlocks} />
    </ContentWrapper>
  );
};

export default Home;
