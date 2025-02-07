import Colors from './documents/colors';
import MainNavigation from './documents/mainNavigation';
import SiteSettings from './documents/siteSettings';
import ParentProduct from './documents/parentProduct';
import ProductVariant from './documents/productVariant';
import { FontColors, ThemeColors } from './fields/globalColors';
import { RichImage } from './fields/images';

const schemaTypes = [
  // Document Types
  Colors,
  MainNavigation,
  ParentProduct,
  ProductVariant,
  SiteSettings,

  // Fields
  FontColors,
  RichImage,
  ThemeColors
];

export default schemaTypes;
