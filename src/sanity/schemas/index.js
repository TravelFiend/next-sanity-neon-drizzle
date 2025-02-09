import SiteSettings from './documents/siteSettings';
import ParentProduct from './documents/parentProduct';
import ProductVariant from './documents/productVariant';
import { FontColors, ThemeColors, Colors } from './fields/globalColors';
import Footer from './fields/footer';
import MainNavigation from './fields/mainNavigation';
import SEO from './reusableTypes/seo';
import { RichImage } from './reusableTypes/images';
import { LinkWithIcon, NavLinks } from './reusableTypes/links';

const schemaTypes = [
  // Document Types
  ParentProduct,
  ProductVariant,
  SiteSettings,

  // Fields
  Colors,
  FontColors,
  Footer,
  ThemeColors,
  MainNavigation,
  SEO,

  // Reusable Types
  LinkWithIcon,
  NavLinks,
  RichImage
];

export default schemaTypes;
