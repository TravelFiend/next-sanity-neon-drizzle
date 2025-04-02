import { getHomepage } from '@/lib/actions/groqQueries/queries/homepage';
import ContentBlocks from '@/components/blocks/ContentBlocks';

const Home = async () => {
  const { data } = await getHomepage();
  const { contentBlocks } = data;

  return <ContentBlocks contentBlocks={contentBlocks} />;
};

export default Home;
