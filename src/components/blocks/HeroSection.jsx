import conditionalClasses from '@/lib/utils/conditionalClasses';
import Image from 'next/image';

const HeroSection = ({ blockData, index }) => {
  const {
    image,
    title,
    subtitle
    // ctaButton,
    // paddingX,
    // paddingY,
    // textAlignment,
    // textBlockAlignment
  } = blockData;

  const isFirst = index === 0;

  return (
    <>
      <section
        className={conditionalClasses(
          'z-0 w-full',
          isFirst ? 'absolute -top-16 h-screen' : 'h-2/3'
        )}
      >
        <div>
          <Image
            src={image?.imageAsset?.url}
            fill
            alt={image?.altText}
            className="object-cover"
          />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
          <h1 className="text-4xl font-bold text-white">{title}</h1>
          <p className="text-2xl text-white">{subtitle}</p>
        </div>
      </section>
      {isFirst ? <div className="h-screen" /> : null}
    </>
  );
};

export default HeroSection;
