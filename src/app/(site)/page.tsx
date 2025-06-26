import { getHomepage } from '@/lib/actions/groqQueries/queries/homepage';
import ContentBlocks from '@/components/blocks/ContentBlocks';

const Home = async () => {
  const homepage = await getHomepage();
  if (!homepage) {
    throw new Error('Homepage data not found');
  }

  const { contentBlocks } = homepage;

  return <ContentBlocks contentBlocks={contentBlocks} />;
};

export default Home;
