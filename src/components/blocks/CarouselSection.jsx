import Carousel from '../common/Carousel';

const CarouselSection = ({ blockData }) => {
  const { images, direction } = blockData;

  return (
    <section className="flex h-80 w-screen">
      <Carousel slidesData={images} direction={direction} />
    </section>
  );
};

export default CarouselSection;
