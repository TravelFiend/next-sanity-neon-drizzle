import Carousel from '../common/Carousel';
import type { CarouselBlock } from '@/sanity/types';

type CarouselSectionProps = {
  blockData: CarouselBlock;
};

const CarouselSection: React.FC<CarouselSectionProps> = ({ blockData }) => {
  const { images, direction } = blockData;

  return (
    <section className="flex h-80 w-screen">
      <Carousel slidesData={images} direction={direction} />
    </section>
  );
};

export default CarouselSection;
