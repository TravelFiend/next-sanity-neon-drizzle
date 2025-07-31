import type {
  HOMEPAGE_QUERYResult,
  SITE_SETTINGS_QUERYResult
} from './generatedTypes';

/* LAYOUT TYPES */

// MainHeader and child components
export type MainNavRes = NonNullable<SITE_SETTINGS_QUERYResult>['mainNav'];
export type NotNullMainNavRes = NonNullable<
  NonNullable<SITE_SETTINGS_QUERYResult>['mainNav']
>;
// export type NonNullMainNavRes = NonNullable<MainNavRes>;
export type NavTabsRes = NonNullable<MainNavRes>['navTabs'];
export type NavTabItemRes = NonNullable<NavTabsRes>[number];
export type SecondLevelLinksRes = NavTabItemRes['secondLevelLinks'];
export type NotNullSecondLevelLinksRes = NonNullable<SecondLevelLinksRes>;
export type SingleSecondLevelLinkRes = NotNullSecondLevelLinksRes[number];
export type ThirdLevelLinkRes = NonNullable<
  SingleSecondLevelLinkRes['thirdLevelLinks']
>;

// Footer
export type FooterRes = NonNullable<
  NonNullable<SITE_SETTINGS_QUERYResult>['footer']
>;
export type BasicLinkRes = NonNullable<FooterRes>['legalLinks'];

/* CONTENT TYPES */

// Homepage
export type HomepageRes = NonNullable<HOMEPAGE_QUERYResult>;

// ContentBlocks
export type HomepageContentBlocksRes = HomepageRes['contentBlocks'];
type ContentBlockUnionType = NonNullable<HomepageContentBlocksRes>[number];

type ExtractBlock<T extends ContentBlockUnionType['_type']> = Extract<
  ContentBlockUnionType,
  { _type: T }
>;

export type ImageTextBlockRes = ExtractBlock<'imageTextBlock'>;
export type HeroBlockRes = ExtractBlock<'heroBlock'>;
export type TextBlockRes = ExtractBlock<'textBlock'>;
export type CarouselBlockRes = ExtractBlock<'carouselBlock'>;
export type CardsRes = NonNullable<CarouselBlockRes['images']>;
