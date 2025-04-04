import Homepage from './documents/homepage';
import SiteSettings from './documents/siteSettings';
import ParentProduct from './documents/parentProduct';
import ProductVariant from './documents/productVariant';
import Footer from './fields/footer';
import { MainNav, NavTab, SecondLevelLinks } from './fields/mainNavigation';
import SiteColorsSelector from './reusableTypes/colors';
import {
  ContentBlocks,
  HeroBlock,
  TextBlock
} from './reusableTypes/contentBlocks';
import CTAButton from './reusableTypes/ctaButton';
import { RichImage } from './reusableTypes/images';
import Font from './reusableTypes/font';
import { BasicLink, LinkWithIcon } from './reusableTypes/links';
import SEO from './reusableTypes/seo';
import {
  ContentAlign,
  HorizontalAlign,
  VerticalAlign
} from './reusableTypes/alignment';

const schemaTypes = [
  // Document Types
  Homepage,
  ParentProduct,
  ProductVariant,
  SiteSettings,

  // Fields
  Footer,
  MainNav,
  NavTab,
  SEO,

  // Reusable Types
  BasicLink,
  ContentAlign,
  ContentBlocks,
  CTAButton,
  Font,
  HeroBlock,
  HorizontalAlign,
  LinkWithIcon,
  RichImage,
  SecondLevelLinks,
  SiteColorsSelector,
  TextBlock,
  VerticalAlign
];

export default schemaTypes;
