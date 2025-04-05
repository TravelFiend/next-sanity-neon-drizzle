import conditionalClasses from '@/lib/utils/conditionalClasses';
import Image from 'next/image';
import {
  bgColorSelector,
  setOpacity,
  setTextAlignment,
  setElementHorizontalAlignment,
  setElementVerticalAlignment,
  textColorSelector
} from '@/lib/utils/stylesLookup';
import LinkButton from '../common/LinkButton';

// TODO: implement Sanity text shadow and text shadow color selections on FE

const HeroSection = ({ blockData, index }) => {
  const {
    image,
    isFullWidth,
    bgColor,
    title,
    subtitle,
    textColor,
    // showTextShadow,
    // textShadowColor,
    ctaButton,
    textAlignment,
    textBlockAlignment,
    overlay
  } = blockData;

  const isFirst = index === 0;

  return (
    <>
      <section
        className={conditionalClasses(
          'z-0 m-auto h-screen w-full',
          isFullWidth ? '' : 'p-20',
          isFirst ? 'absolute top-0' : 'h-[70vh]',
          isFirst && !isFullWidth ? 'pt-28' : '',
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
          {overlay?.coverage === 'fullImage' ? (
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
              setTextAlignment(textAlignment)
            )}
          >
            {overlay?.coverage === 'textOnly' ? (
              <div
                className={`absolute bottom-0 left-0 h-full w-full ${bgColorSelector(overlay.color)} ${setOpacity(overlay.opacity)}`}
              />
            ) : null}
            <h1
              className={conditionalClasses(
                'text-6xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]',
                textColor ? textColorSelector(textColor) : 'text-white'
                // showTextShadow && 'text-shadow-md'
              )}
            >
              {title}
            </h1>
            <p
              className={conditionalClasses(
                'text-2xl text-shadow-lg',
                textColor ? textColorSelector(textColor) : 'text-white'
                // showTextShadow && 'text-shadow'
              )}
            >
              {subtitle}
            </p>
            {ctaButton ? <LinkButton linkData={ctaButton} /> : null}
          </div>
        </div>
      </section>
      {isFirst ? <div className="-mt-12 h-screen sm:-mt-16" /> : null}
    </>
  );
};

export default HeroSection;
