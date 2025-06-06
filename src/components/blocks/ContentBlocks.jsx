import TextSection from './TextSection';
import HeroSection from './HeroSection';
import CarouselSection from './CarouselSection';
import ImageTextSection from './ImageTextSection';

const ContentBlocks = ({ contentBlocks }) => {
  return (
    <>
      {contentBlocks.map((block, idx) => {
        const { _key, _type, ...blockData } = block;

        switch (_type) {
          case 'heroBlock':
            return <HeroSection key={_key} blockData={blockData} index={idx} />;
          case 'textBlock':
            return <TextSection key={_key} blockData={blockData} />;
          case 'carouselBlock':
            return <CarouselSection key={_key} blockData={blockData} />;
          case 'imageTextBlock':
            return <ImageTextSection key={_key} blockData={blockData} />;
          default:
            console.error(`${_type} is not a valid content block type`);
            return null;
        }
      })}
    </>
  );
};

export default ContentBlocks;
