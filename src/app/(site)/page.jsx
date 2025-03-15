import { getHomepage } from '@/lib/actions/groqQueries/queries/homepage';
import ContentWrapper from '@/components/common/ContentWrapper';

const Home = async () => {
  const { data } = await getHomepage();

  if (!data) throw new Error('Home page data not found');

  return (
    <ContentWrapper>
      {/* <div>{title && <span>{title}</span>}</div> */}
    </ContentWrapper>
  );
};

export default Home;
