import contentAlignFragment from './alignment';
import CTAButtonFragment from './ctaButton';
import { richImageFragment } from './richImage';

const heroBlockFragment = `
  _type,
  image{
    ${richImageFragment}
  },
  isFullWidth,
  bgColor,
  title,
  subtitle,
  textColor,
  showTextOutline,
  textOutlineColor,
  textOutlineSize,
  ctaButton{
    ${CTAButtonFragment}
  },
  textAlignment,
  textBlockAlignment{
    ${contentAlignFragment}
  },
  overlay{
    coverage,
    color,
    opacity
  }
`;

const textBlockFragment = `
  _type,
  title,
  subtitle,
  body,
  alignment
`;

const imageTextBlockFragment = `
  _type,
  image{
    ${richImageFragment}
  },
  text{
    ${textBlockFragment}
  },
  imageAlignment
`;

const carouselBlockFragment = `
  _type,
  images[]{
    ${richImageFragment}
  },
  direction
`;

const contentBlocksFragment = `
  _key,
  _type == "heroBlock" => {
    _type,
    ${heroBlockFragment}
  },
  _type == "textBlock" => {
    _type,
    ${textBlockFragment}
  },
  _type == "imageTextBlock" => {
    _type,
    ${imageTextBlockFragment}
  },
  _type == "carouselBlock" => {
    _type,
    ${carouselBlockFragment}
  }
`;

export default contentBlocksFragment;
