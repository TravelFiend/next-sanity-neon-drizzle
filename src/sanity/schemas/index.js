import SiteSettings from './documents/siteSettings';
import ParentProduct from './documents/parentProduct';
import ProductVariant from './documents/productVariant';
import { FontColors, ThemeColors, Colors } from './fields/globalColors';
import Footer from './fields/footer';
import { MainNav, NavTab, SecondLevelLinks } from './fields/mainNavigation';
import { ContentBlocks, TextBlock } from './reusableTypes/contentBlocks';
import { RichImage } from './reusableTypes/images';
import Font from './reusableTypes/font';
import { BasicLink, LinkWithIcon } from './reusableTypes/links';
import SEO from './reusableTypes/seo';

const schemaTypes = [
  // Document Types
  ParentProduct,
  ProductVariant,
  SiteSettings,

  // Fields
  Colors,
  FontColors,
  Footer,
  MainNav,
  NavTab,
  SEO,
  ThemeColors,

  // Reusable Types
  BasicLink,
  ContentBlocks,
  Font,
  LinkWithIcon,
  RichImage,
  SecondLevelLinks,
  TextBlock
];

export default schemaTypes;
