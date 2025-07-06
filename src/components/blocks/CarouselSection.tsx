import Carousel from '../common/Carousel';
import type { CarouselBlock } from '@/sanity/types';

type CarouselSectionProps = {
  carouselData: CarouselBlock;
};

const CarouselSection: React.FC<CarouselSectionProps> = ({ carouselData }) => {
  const { images, direction } = carouselData;

  return (
    <section className="flex h-80 w-screen">
      <Carousel slidesData={images} direction={direction} />
    </section>
  );
};

export default CarouselSection;
