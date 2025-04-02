import contentAlignFragment from './alignment';
import CTAButtonFragment from './ctaButton';
import { richImageFragment } from './richImage';

const heroBlockFragment = `
  _type,
  image{
    ${richImageFragment}
  },
  paddingX,
  paddingY,
  title,
  subtitle,
  ctaButton{
    ${CTAButtonFragment}
  },
  textAlignment,
  textBlockAlignment{
    ${contentAlignFragment}
  },
  overlay{
    coverage,
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

const contentBlocksFragment = `
  _key,
  _type == "heroBlock" => {
    ${heroBlockFragment}
  },
  _type == "textBlock" => {
    ${textBlockFragment}
  }
`;

export { textBlockFragment, contentBlocksFragment };
