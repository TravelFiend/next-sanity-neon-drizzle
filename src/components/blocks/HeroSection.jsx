import conditionalClasses from '@/lib/utils/conditionalClasses';
import Image from 'next/image';
import {
  bgColorSelector,
  setOpacity,
  setTextAlignment,
  setElementHorizontalAlignment,
  setElementVerticalAlignment
} from '@/lib/utils/stylesLookup';

const HeroSection = ({ blockData, index }) => {
  const {
    image,
    isFullWidth,
    bgColor,
    title,
    subtitle,
    // ctaButton,
    textAlignment,
    textBlockAlignment,
    overlay
  } = blockData;

  // console.log({
  //   ctaButton,
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
          bgColorSelector(bgColor)
        )}
      >
        <div
          className={conditionalClasses(
            'relative flex h-full',
            setElementHorizontalAlignment(textBlockAlignment.horizontalAlign),
            setElementVerticalAlignment(textBlockAlignment.verticalAlign)
          )}
        >
          <Image
            src={image?.imageAsset?.url}
            fill
            alt={image?.altText}
            className="object-cover"
          />
          {overlay.coverage === 'fullImage' ? (
            <div
              className={conditionalClasses(
                'absolute z-10 h-full w-full',
                overlay?.coverage === 'fullImage'
                  ? `${bgColorSelector(overlay.color)} ${setOpacity(overlay.opacity)}`
                  : ''
              )}
            />
          ) : null}

          <div
            className={conditionalClasses(
              'absolute',
              isFullWidth ? 'm-16 p-20' : 'm-6 p-14',
              overlay?.coverage === 'textOnly'
                ? `${bgColorSelector(overlay.color)} ${setOpacity(overlay.opacity)}`
                : '',
              setTextAlignment(textAlignment)
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
