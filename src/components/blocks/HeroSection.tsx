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
import type { HeroBlockRes } from '@sanityTypes/derivedTypes';

type HeroSectionProps = {
  heroData: HeroBlockRes;
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
          isFullWidth ? '' : 'p-10 sm:p-20',
          isFirst ? '' : 'h-[70vh]',
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
              className={`absolute inset-0 z-10 ${setBgColor(overlay.color)} ${setOpacity(overlay.opacity)}`}
            />
          ) : null}

          <div
            className={conditionalClasses(
              'absolute z-20',
              isFullWidth
                ? 'm-8 p-10 md:m-16 md:p-20'
                : 'm-3 p-7 md:m-6 md:p-14',
              setTextAlignment(textAlignment)
            )}
          >
            {overlay?.coverage === 'textOnly' ? (
              <div
                className={`absolute inset-0 rounded-2xl ${setBgColor(overlay.color)} ${setOpacity(overlay.opacity)}`}
              />
            ) : null}
            <h1
              className={conditionalClasses(
                'text-outline-secondary-md relative z-30 text-2xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-7xl',
                setTextColor(textColor),
                showTextOutline &&
                  setTextOutline(textOutlineColor, textOutlineSize)
              )}
            >
              {title}
            </h1>
            <p
              className={conditionalClasses(
                'font-outline-primary-xs relative z-30 text-lg text-shadow-lg md:text-2xl',
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

      {isFirst ? (
        <div
          className="-mt-[theme(height.12)] min-h-[theme(height.12)] w-full sm:-mt-[theme(height.16)] sm:min-h-[theme(height.16)]"
          aria-hidden="true"
        />
      ) : null}
    </>
  );
};

export default HeroSection;
