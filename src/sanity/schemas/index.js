import SiteSettings from './documents/siteSettings';
import ParentProduct from './documents/parentProduct';
import ProductVariant from './documents/productVariant';
import { FontColors, ThemeColors, Colors } from './fields/globalColors';
import Footer from './fields/footer';
import MainNavigation from './fields/mainNavigation';
import { RichImage } from './reusableTypes/images';
import Font from './reusableTypes/font';
import { LinkWithIcon, NavLinks } from './reusableTypes/links';
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
  ThemeColors,
  MainNavigation,
  SEO,

  // Reusable Types
  Font,
  LinkWithIcon,
  NavLinks,
  RichImage
];

export default schemaTypes;
