'use client';

import conditionalClasses from '@/lib/utils/conditionalClasses';
import useEmblaCarousel from 'embla-carousel-react';
import CloudinaryImg from './CloudinaryImg';
import { useCallback, useEffect } from 'react';
import CardRow from './CardRow';
import Button from './Button';

const Carousel = ({ slidesData, direction }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    active: true,
    align: 'start',
    axis: direction === 'vertical' ? 'y' : 'x'
  });

  useEffect(() => {
    if (emblaApi && slidesData.length > 4) {
      emblaApi.reInit({
        loop: true,
        align: 'start',
        axis: direction === 'vertical' ? 'y' : 'x'
      });
    }
  }, [emblaApi, slidesData.length, direction]);

  if (!slidesData || !Array.isArray(slidesData) || !slidesData.length) {
    throw new Error('Invalid slidesData provided to Carousel component');
  }

  const handleKeyDown = useCallback(
    event => {
      event.preventDefault();
      if (event.key === 'ArrowLeft') {
        emblaApi?.scrollPrev();
      } else if (event.key === 'ArrowRight') {
        emblaApi?.scrollNext();
      }
    },
    [emblaApi]
  );

  return (
    <>
      {slidesData.length > 4 ? (
        <div
          ref={emblaRef}
          onKeyDown={handleKeyDown}
          className={conditionalClasses(
            'relative flex h-full items-center justify-between overflow-hidden',
            direction === 'vertical' ? 'flex-col' : 'w-full'
          )}
          role="region"
          aria-roledescription="carousel"
          tabIndex={0}
        >
          <div className="flex h-full w-full">
            {slidesData.map((slide, idx) => (
              <div
                key={slide.imageAsset.public_id || idx}
                className="relative mr-[1%] ml-[1%] h-full flex-[0_0_26%]"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${idx + 1} of ${slidesData.length}: ${slide.altText}`}
              >
                <CloudinaryImg
                  src={slide.imageAsset.public_id}
                  alt={slide.altText}
                  sizes="25vw"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 z-10 flex items-center justify-between px-4">
            <Button
              className="rounded-full"
              onClick={() => emblaApi.scrollPrev()}
              label="Prev"
              ariaLabel="Previous slide"
            />
            <Button
              className="rounded-full"
              onClick={() => emblaApi.scrollNext()}
              label="Next"
              aria-label="Next slide"
            />
          </div>
        </div>
      ) : (
        <CardRow cards={slidesData} />
      )}
    </>
  );
};

export default Carousel;
