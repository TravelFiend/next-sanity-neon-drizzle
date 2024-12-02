import Colors from './documents/colors';
import MainNavigation from './documents/mainNavigation';
import SiteSettings from './documents/siteSettings';
import { FontColors, ThemeColors } from './fields/globalColors';
import ParentProduct from './documents/parentProduct';
import ProductVariant from './documents/productVariant';

const schemaTypes = [
  // Document Types
  Colors,
  MainNavigation,
  ParentProduct,
  ProductVariant,
  SiteSettings,

  // Fields
  FontColors,
  ThemeColors
];

export default schemaTypes;
