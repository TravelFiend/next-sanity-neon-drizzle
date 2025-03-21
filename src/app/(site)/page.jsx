import { getHomepage } from '@/lib/actions/groqQueries/queries/homepage';
import ContentWrapper from '@/components/common/ContentWrapper';
import ContentBlocks from '@/components/blocks/ContentBlocks';

const Home = async () => {
  const { data } = await getHomepage();
  const { contentBlocks } = data;

  if (!data) {
    throw new Error('Sanity homepage data not found');
  }

  return (
    <ContentWrapper>
      <ContentBlocks contentBlocks={contentBlocks} />
    </ContentWrapper>
  );
};

export default Home;
