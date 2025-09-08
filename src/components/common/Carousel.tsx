'use client';

import conditionalClasses from '@/lib/utils/conditionalClasses';
import useEmblaCarousel from 'embla-carousel-react';
import CloudinaryImg from './CloudinaryImg';
import { useEffect } from 'react';
import CardRow from './CardRow';
import Button from './Button';
import type { CarouselBlockRes } from '@sanityTypes/derivedTypes';

type CarouselProps = {
  cards: CarouselBlockRes['images'];
  direction?: CarouselBlockRes['direction'];
};

const Carousel: React.FC<CarouselProps> = ({ cards, direction }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    active: true,
    align: 'start',
    axis: direction === 'vertical' ? 'y' : 'x'
  });

  useEffect(() => {
    if (emblaApi && cards.length > 4) {
      emblaApi.reInit({
        loop: true,
        align: 'start',
        axis: direction === 'vertical' ? 'y' : 'x'
      });
    }
  }, [emblaApi, cards.length, direction]);

  if (!cards || !Array.isArray(cards) || !cards.length) {
    throw new Error('Invalid cards provided to Carousel component');
  }

  return (
    <>
      {cards.length > 4 ? (
        <div
          ref={emblaRef}
          className={conditionalClasses(
            'relative flex h-full items-center justify-between overflow-hidden',
            direction === 'vertical' ? 'flex-col' : 'w-full'
          )}
          role="region"
          aria-roledescription="carousel"
        >
          <div className="flex h-full w-full">
            {cards.map((slide, idx) => (
              <div
                key={slide._key}
                className="relative mr-[1%] ml-[1%] h-full flex-[0_0_26%]"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${idx + 1} of ${cards.length}: ${slide.altText}`}
              >
                <CloudinaryImg
                  src={slide.imageAsset.public_id!}
                  alt={slide.altText!}
                  sizes="25vw"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 z-10 flex items-center justify-between px-4">
            <Button
              className="rounded-full"
              onClick={() => emblaApi!.scrollPrev()}
              ariaLabel="Previous slide"
            >
              Prev
            </Button>

            <Button
              className="rounded-full"
              onClick={() => emblaApi!.scrollNext()}
              ariaLabel="Next slide"
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <CardRow cards={cards} />
      )}
    </>
  );
};

export default Carousel;
