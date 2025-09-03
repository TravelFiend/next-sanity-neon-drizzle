import { getHomepage } from '@groq/queries/homepage';
import ContentBlocks from '@/components/blocks/ContentBlocks';

export default async function HomePage() {
  const homepage = await getHomepage();
  if (!homepage) {
    throw new Error('Homepage data not found');
  }

  const { contentBlocks } = homepage;

  return <ContentBlocks contentBlocks={contentBlocks} />;
}
