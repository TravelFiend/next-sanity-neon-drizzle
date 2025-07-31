import TextSection from './TextSection';
import HeroSection from './HeroSection';
import CarouselSection from './CarouselSection';
import ImageTextSection from './ImageTextSection';
import type { HOMEPAGE_QUERYResult } from '@sanityTypes/generatedTypes';

type ContentBlocksProps = {
  contentBlocks: NonNullable<HOMEPAGE_QUERYResult>['contentBlocks'];
};

const ContentBlocks: React.FC<ContentBlocksProps> = ({ contentBlocks }) => {
  return (
    <>
      {contentBlocks?.map((block, idx) => {
        const { _key, _type } = block;

        switch (_type) {
          case 'heroBlock':
            return <HeroSection key={_key} heroData={block} index={idx} />;
          case 'textBlock':
            return <TextSection key={_key} textData={block} />;
          case 'imageTextBlock':
            return <ImageTextSection key={_key} imageTextData={block} />;
          case 'carouselBlock':
            return <CarouselSection key={_key} carouselData={block} />;
          default:
            console.error(`${_type} is not a valid content block type`);
            return null;
        }
      })}
    </>
  );
};

export default ContentBlocks;
