import TextSection from './TextSection';
import HeroSection from './HeroSection';
import CarouselSection from './CarouselSection';
import ImageTextSection from './ImageTextSection';
import type { ContentBlocks } from '@/sanity/types';

type ContentBlocksProps = {
  contentBlocks: ContentBlocks;
};

const ContentBlocks: React.FC<ContentBlocksProps> = ({ contentBlocks }) => {
  return (
    <>
      {contentBlocks.map((block, idx) => {
        const { _key, _type } = block;

        switch (_type) {
          case 'heroBlock':
            return <HeroSection key={_key} blockData={block} index={idx} />;
          case 'textBlock':
            return <TextSection key={_key} blockData={block} />;
          case 'carouselBlock':
            return <CarouselSection key={_key} blockData={block} />;
          case 'imageTextBlock':
            return <ImageTextSection key={_key} blockData={block} />;
          default:
            console.error(`${_type} is not a valid content block type`);
            return null;
        }
      })}
    </>
  );
};

export default ContentBlocks;
