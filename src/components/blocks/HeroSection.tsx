import conditionalClasses from '@/lib/utils/conditionalClasses';
import {
  setBgColor,
  setOpacity,
  setTextAlignment,
  setElementHorizontalAlignment,
  setElementVerticalAlignment,
  setTextColor,
  setTextOutline
} from '@/lib/utils/stylesLookup';
import LinkButton from '../common/LinkButton';
import CloudinaryImg from '../common/CloudinaryImg';
import type { HeroBlock } from '@sanityTypes/generatedTypes';

type HeroSectionProps = {
  heroData: HeroBlock;
  index: number;
};
// TODO: implement Sanity text shadow and text shadow color selections on FE

const HeroSection: React.FC<HeroSectionProps> = ({ heroData, index }) => {
  const {
    image,
    isFullWidth,
    bgColor,
    title,
    subtitle,
    textColor,
    showTextOutline,
    textOutlineColor,
    textOutlineSize,
    ctaButton,
    textAlignment,
    textBlockAlignment,
    overlay
  } = heroData;

  if (!heroData) return null;

  const isFirst = index === 0;

  return (
    <>
      <section
        className={conditionalClasses(
          'z-0 m-auto h-screen w-full',
          isFullWidth ? '' : 'p-20',
          isFirst ? 'absolute top-0' : 'h-[70vh]',
          isFirst && !isFullWidth ? 'pt-28' : '',
          setBgColor(bgColor)
        )}
      >
        <div
          className={conditionalClasses(
            'relative flex h-full',
            setElementHorizontalAlignment(textBlockAlignment?.horizontalAlign),
            setElementVerticalAlignment(textBlockAlignment?.verticalAlign)
          )}
        >
          <CloudinaryImg
            src={image.imageAsset.public_id!}
            alt={image.altText!}
            className="object-cover"
            priority={isFirst}
            sizes="100vw"
          />
          {overlay?.coverage === 'fullImage' ? (
            <div
              className={conditionalClasses(
                `absolute z-10 h-full w-full ${setBgColor(overlay.color)} ${setOpacity(overlay.opacity)}`
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
                className={`absolute bottom-0 left-0 h-full w-full rounded-2xl ${setBgColor(overlay.color)} ${setOpacity(overlay.opacity)}`}
              />
            ) : null}
            <h1
              className={conditionalClasses(
                'text-outline-secondary-md text-7xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]',
                setTextColor(textColor),
                showTextOutline &&
                  setTextOutline(textOutlineColor, textOutlineSize)
              )}
            >
              {title}
            </h1>
            <p
              className={conditionalClasses(
                'font-outline-primary-xs text-2xl text-shadow-lg',
                setTextColor(textColor),
                showTextOutline && setTextOutline(textOutlineColor, 'sm')
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
