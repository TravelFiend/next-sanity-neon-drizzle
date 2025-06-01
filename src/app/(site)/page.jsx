import { getHomepage } from '@/lib/actions/groqQueries/queries/homepage';
import ContentBlocks from '@/components/blocks/ContentBlocks';

const Home = async () => {
  const homepage = await getHomepage();
  if (!homepage) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Welcome to the site!</h1>
        <p>No Homepage content was returned. Please see error logs.</p>
      </div>
    );
  }

  const { contentBlocks } = homepage.data;

  return <ContentBlocks contentBlocks={contentBlocks} />;
};

export default Home;
