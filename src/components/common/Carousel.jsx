'use client';

import conditionalClasses from '@/lib/utils/conditionalClasses';
import useEmblaCarousel from 'embla-carousel-react';
import CloudinaryImg from './CloudinaryImg';
import { setSlideFlex, setSlideMargin } from '@/lib/utils/stylesLookup';

const Carousel = ({ slidesData, direction }) => {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    active: slidesData.length > 4
  });

  return (
    <div
      ref={emblaRef}
      className={conditionalClasses(
        'flex h-full items-center justify-between overflow-hidden',
        direction === 'vertical' ? 'flex-col' : 'w-full'
      )}
    >
      <div className="flex h-full w-full">
        {slidesData.map((slide, idx) => (
          <div
            key={idx}
            className={conditionalClasses(
              'relative h-full min-w-0',
              setSlideMargin(slidesData.length),
              setSlideFlex(slidesData.length)
            )}
          >
            <CloudinaryImg
              src={slide.imageAsset.public_id}
              alt={slide.altText}
              sizes={slidesData.length === 3 ? '33vw' : '25vw'}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
