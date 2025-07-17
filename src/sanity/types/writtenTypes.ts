import type {
  HOMEPAGE_QUERYResult,
  SITE_SETTINGS_QUERYResult
} from './generatedTypes';

// This is the non-nullable version of the Homepage query result
export type HomepageRes = NonNullable<HOMEPAGE_QUERYResult>;

// This is the type of the 'contentBlocks' array (which itself can be null or an array of union types)
export type HomepageContentBlocksArray = HomepageRes['contentBlocks'];

// This is the union type of all possible content block items
type ContentBlockUnionType = NonNullable<HomepageContentBlocksArray>[number];

// *** THIS IS THE CRUCIAL DERIVATION FOR IMAGETEXTSECTION ***
// We are extracting the exact shape of the 'imageTextBlock' from the HOMEPAGE_QUERYResult's union.
// This type WILL include `string | null` for `public_id`, `altText`, etc.
export type ImageTextBlockRes = ContentBlockUnionType extends infer T
  ? T extends { _type: 'imageTextBlock' }
    ? T
    : never
  : never;

// Derive other block types similarly for consistency in ContentBlocks.tsx
export type HeroBlockRes = ContentBlockUnionType extends infer T
  ? T extends { _type: 'heroBlock' }
    ? T
    : never
  : never;

export type TextBlockRes = ContentBlockUnionType extends infer T
  ? T extends { _type: 'textBlock' }
    ? T
    : never
  : never;

export type CarouselBlockRes = ContentBlockUnionType extends infer T
  ? T extends { _type: 'carouselBlock' }
    ? T
    : never
  : never;

// ... other derived types for navigation etc.

// MainHeader and child components
export type MainNavRes = NonNullable<SITE_SETTINGS_QUERYResult>['mainNav'];
export type NavTabsRes = NonNullable<MainNavRes>['navTabs'];
export type NavTabItemRes = NonNullable<NavTabsRes>[number];
export type SecondLevelLinksRes = NavTabItemRes['secondLevelLinks'];
export type SingleSecondLevelLinkRes = NonNullable<SecondLevelLinksRes>[number];
