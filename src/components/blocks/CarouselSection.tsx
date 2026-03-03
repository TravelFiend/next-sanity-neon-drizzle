import Carousel from '../common/Carousel';
import type { CarouselBlockRes } from '@sanityTypes/derivedTypes';

type CarouselSectionProps = {
  carouselData: CarouselBlockRes;
};

const CarouselSection = ({ carouselData }: CarouselSectionProps) => {
  const { images, direction } = carouselData;

  return (
    <section className="flex h-80 w-screen">
      <Carousel cards={images} direction={direction} />
    </section>
  );
};

export default CarouselSection;
