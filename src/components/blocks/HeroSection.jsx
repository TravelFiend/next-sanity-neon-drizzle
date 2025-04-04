import conditionalClasses from '@/lib/utils/conditionalClasses';
import Image from 'next/image';

const HeroSection = ({ blockData, index }) => {
  const {
    image,
    isFullWidth,
    bgColor,
    title,
    subtitle,
    // ctaButton,
    textAlignment
    // textBlockAlignment,
    // overlay
  } = blockData;

  // console.log({
  //   image,
  // isFullWidth,
  // bgColor,
  // title,
  // subtitle,
  //   ctaButton,
  // textAlignment
  //   textBlockAlignment,
  //   overlay
  // });

  const isFirst = index === 0;

  return (
    <>
      <section
        className={conditionalClasses(
          'z-0 m-auto w-full',
          isFullWidth ? '' : 'p-20',
          isFirst ? 'absolute top-0 h-screen' : 'h-2/3',
          isFirst && isFullWidth ? '' : 'pt-28',
          !bgColor
            ? ''
            : bgColor === 'primary'
              ? 'bg-primary'
              : bgColor === 'secondary'
                ? 'bg-secondary'
                : bgColor === 'tertiary'
                  ? 'bg-tertiary'
                  : bgColor === 'accent'
                    ? 'bg-accent'
                    : 'bg-highlight'
        )}
      >
        <div className="relative h-full">
          <Image
            src={image?.imageAsset?.url}
            fill
            alt={image?.altText}
            className="object-cover"
          />

          <div
            className={conditionalClasses(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform',
              textAlignment === 'left'
                ? 'text-left'
                : textAlignment === 'right'
                  ? 'text-right'
                  : 'text-center'
            )}
          >
            <h1 className="text-4xl font-bold text-white">{title}</h1>
            <p className="text-2xl text-white">{subtitle}</p>
          </div>
        </div>
      </section>
      {isFirst ? <div className="h-screen" /> : null}
    </>
  );
};

export default HeroSection;
